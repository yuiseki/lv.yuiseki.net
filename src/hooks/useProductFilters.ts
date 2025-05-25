import { useEffect, useState, useCallback } from "react";
import { useDebounce } from "./debounce";
import { PRICE_LIMIT } from "../lib/const";

type FilterOptions = {
  minPrice?: number;
  maxPrice?: number;
  query?: string;
  like?: boolean;
  bookmark?: boolean;
  star?: boolean;
};

type UseProductFiltersReturn = {
  products: string[] | undefined;
  totalPrice: number;
  minPrice: number;
  maxPrice: number;
  query: string;
  filterLike: boolean;
  filterBookmark: boolean;
  filterStar: boolean;
  setMinPrice: (v: number) => void;
  setMaxPrice: (v: number) => void;
  setQuery: (v: string) => void;
  toggleLike: () => void;
  toggleBookmark: () => void;
  toggleStar: () => void;
  shuffle: () => void;
};

export function useProductFilters(
  initial: FilterOptions = {}
): UseProductFiltersReturn {
  const debounce = useDebounce(200);

  const [products, setProducts] = useState<string[] | undefined>(undefined);
  const [totalPrice, setTotalPrice] = useState(0);

  const [minPrice, setMinPrice] = useState(initial.minPrice ?? 0);
  const [maxPrice, setMaxPrice] = useState(initial.maxPrice ?? PRICE_LIMIT);
  const [query, setQuery] = useState(initial.query ?? "");
  const [filterLike, setFilterLike] = useState(initial.like ?? false);
  const [filterBookmark, setFilterBookmark] = useState(
    initial.bookmark ?? false
  );
  const [filterStar, setFilterStar] = useState(initial.star ?? false);

  // debounce states
  const [debouncedMin, setDebouncedMin] = useState(minPrice);
  const [debouncedMax, setDebouncedMax] = useState(maxPrice);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // handlers
  const handleMinPrice = (v: number) => {
    setMinPrice(v);
    debounce(() => setDebouncedMin(v));
  };
  const handleMaxPrice = (v: number) => {
    setMaxPrice(v);
    debounce(() => setDebouncedMax(v));
  };
  const handleQuery = (v: string) => {
    setQuery(v);
    debounce(() => setDebouncedQuery(v));
  };

  const toggleLike = () => setFilterLike((v) => !v);
  const toggleBookmark = () => setFilterBookmark((v) => !v);
  const toggleStar = () => setFilterStar((v) => !v);

  // シャッフル
  const shuffle = useCallback(() => {
    if (!products) return;
    setProducts(undefined);
    setTimeout(() => {
      setProducts([...products].sort(() => Math.random() - 0.5));
    }, 0);
  }, [products]);

  useEffect(() => {
    let ignore = false;
    (async () => {
      // お気に入り・ブックマーク・スターのID抽出
      const getIds = (prefix: string) =>
        Object.entries(localStorage)
          .filter(([k, v]) => k.startsWith(prefix) && JSON.parse(v))
          .map(([k]) => k.split("-")[2]);

      const likeIds = filterLike ? getIds("lv-fav-") : undefined;
      const bookmarkIds = filterBookmark ? getIds("lv-bookmark-") : undefined;
      const starIds = filterStar ? getIds("lv-star-") : undefined;

      // CSVファイルをまとめて取得
      const files = Array.from(
        { length: 10 },
        (_, i) => `/search_${i.toString().padStart(2, "0")}.csv`
      );
      const texts = await Promise.all(
        files.map((f) => fetch(f).then((r) => r.text()))
      );
      const lines = texts.join("\n").split("\n").filter(Boolean);

      let sum = 0;
      const filtered = lines
        .map((line) => line.split(","))
        .filter((cols) => {
          const price = parseInt(cols[2]);
          if (isNaN(price)) return false;
          if (price < debouncedMin || price > debouncedMax) return false;
          if (debouncedQuery && debouncedQuery.length > 0) {
            console.log(debouncedQuery);
            const isMatch = debouncedQuery
              .split(/[\x20\u3000]/)
              .map((q) => {
                return (
                  q.length === 0 ||
                  cols.join(",").toLowerCase().indexOf(q.toLowerCase()) > 0
                );
              })
              .reduce((prev, current) => {
                return prev && current;
              });
            return isMatch;
          }
          if (likeIds && !likeIds.includes(cols[0].replace(/"/g, "")))
            return false;
          if (bookmarkIds && !bookmarkIds.includes(cols[0].replace(/"/g, "")))
            return false;
          if (starIds && !starIds.includes(cols[0].replace(/"/g, "")))
            return false;
          return true;
        })
        .map((cols) => {
          sum += parseInt(cols[2]);
          return cols[0].replace(/"/g, "");
        });

      if (!ignore) {
        setProducts(Array.from(new Set(filtered)));
        setTotalPrice(sum);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [
    debouncedMin,
    debouncedMax,
    debouncedQuery,
    filterLike,
    filterBookmark,
    filterStar,
  ]);

  return {
    products,
    totalPrice,
    minPrice,
    maxPrice,
    query,
    filterLike,
    filterBookmark,
    filterStar,
    setMinPrice: handleMinPrice,
    setMaxPrice: handleMaxPrice,
    setQuery: handleQuery,
    toggleLike,
    toggleBookmark,
    toggleStar,
    shuffle,
  };
}
