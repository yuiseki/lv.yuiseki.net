import { useEffect, useState } from "react";
import { PriceRangeInput } from "./components/PriceRangeInput";
import { ProductCell } from "./components/ProductCell";
import { SearchQueryInput } from "./components/SearchQueryInput";
import { FilterBookmarkContext } from "./context/FilterBookmarkContext";
import { FilterFavContext } from "./context/FilterFavContext";
import { useDebounce } from "./hooks/debounce";
import { useLocalStorage } from "./hooks/localStorage";
import { PRICE_LIMIT } from "./lib/const";

function App() {
  const [products, setProducts] = useState<string[] | undefined>(undefined);

  const debounce = useDebounce(200);
  const [debouncedMinPrice, setDebouncedMinPrice] = useState(0);
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(PRICE_LIMIT);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filterFav, setFilterFav] = useState(false);
  const [filterBookmark, setFilterBookmark] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    (async () => {
      let favProducts: Array<string | undefined> = [];
      if (filterFav) {
        favProducts = Object.entries(localStorage)
          .map((entry) => {
            if (entry[0].startsWith("lv-fav-") && JSON.parse(entry[1])) {
              return entry[0].split("-")[2];
            }
          })
          .filter((v) => v);
      }
      console.log("fav: ", favProducts);

      let bookmarkProducts: Array<string | undefined> = [];
      if (filterBookmark) {
        bookmarkProducts = Object.entries(localStorage)
          .map((entry) => {
            if (entry[0].startsWith("lv-bookmark-") && JSON.parse(entry[1])) {
              return entry[0].split("-")[2];
            }
          })
          .filter((v) => v);
      }
      console.log("bookmark: ", bookmarkProducts);

      const res = await fetch("/search.csv");
      const text = await res.text();
      let newTotalPrice = 0;
      const allProducts = text
        .split("\n")
        .filter((line) => {
          if (line.length === 0) {
            return false;
          }
          if (debouncedQuery && debouncedQuery.length > 0) {
            const isMatch = debouncedQuery
              .split(/[\x20\u3000]/)
              .map((q) => {
                return (
                  q.length === 0 ||
                  line.toLowerCase().indexOf(q.toLowerCase()) > 0
                );
              })
              .reduce((prev, current) => {
                return prev && current;
              });
            return isMatch;
          }
          return true;
        })
        .filter((line) => {
          const price = parseInt(line.split(",")[3]);
          if (Number.isNaN(price)) {
            return false;
          }
          if (price < debouncedMinPrice) {
            return false;
          }
          if (debouncedMaxPrice < price) {
            return false;
          }
          return true;
        })
        .map((line) => {
          return [line.split(",")[0].replaceAll('"', ""), line.split(",")[3]];
        })
        //.filter((line) => {
        //  return line.length < 25;
        //})
        .filter((line) => {
          if (filterFav) {
            return favProducts.indexOf(line[0]) > -1;
          }
          return true;
        })
        .filter((line) => {
          if (filterBookmark) {
            return bookmarkProducts.indexOf(line[0]) > -1;
          }
          return true;
        })
        .map((line) => {
          newTotalPrice += parseInt(line[1]);
          return line[0];
        });
      const uniqProducts = [...new Set(allProducts)];
      setProducts(uniqProducts);
      setTotalPrice(newTotalPrice);
    })();
  }, [
    debouncedQuery,
    debouncedMinPrice,
    debouncedMaxPrice,
    filterFav,
    filterBookmark,
  ]);

  const shuffle = () => {
    if (!products) {
      return;
    }
    setProducts(undefined);
    const shuffledProducts = [
      ...products.sort(() => {
        return Math.random() - 0.5;
      }),
    ];
    setProducts(shuffledProducts);
  };

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <FilterBookmarkContext.Provider value={filterBookmark}>
      <FilterFavContext.Provider value={filterFav}>
        <div>
          <h1 style={{ margin: 0, textAlign: "center" }}>lv.yuiseki.net</h1>
          <div
            style={{
              position: "sticky",
              top: 0,
              paddingTop: "15px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flexStart",
              alignItems: "center",
              zIndex: 1000,
              background: "white",
            }}
          >
            <div
              style={{
                justifyContent: "center",
                alignContent: "center",
                maxWidth: "90%",
                minWidth: "90%",
                display: "flex",
                flexDirection: "column",
                margin: "20px 0",
              }}
            >
              <PriceRangeInput
                onChangeMinPrice={(value) => {
                  debounce(() => {
                    setDebouncedMinPrice(value);
                  });
                }}
                onChangeMaxPrice={(value) => {
                  debounce(() => {
                    setDebouncedMaxPrice(value);
                  });
                }}
              />
            </div>
            <div
              style={{
                position: "relative",
                justifyContent: "center",
                width: "70%",
                display: "flex",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <SearchQueryInput
                onChange={(value) => {
                  debounce(() => {
                    setDebouncedQuery(value);
                  });
                }}
              />
            </div>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                display: "flex",
                maxWidth: "100%",
                marginBottom: "15px",
              }}
            >
              <input
                type="button"
                value="Shuffle"
                style={{
                  display: "inline-block",
                  fontSize: "1em",
                  lineHeight: "1",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: "0px",
                  padding: "1rem 1.5rem",
                  width: "21.25rem",
                }}
                onClick={shuffle}
              />
              <input
                type="button"
                value={
                  filterFav ? "Filtering only likes..." : "Filter only likes"
                }
                style={{
                  display: "inline-block",
                  fontSize: "1em",
                  lineHeight: "1",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: "0px",
                  padding: "1rem 1.5rem",
                  width: "21.25rem",
                  marginLeft: "30px",
                }}
                onClick={() => {
                  setFilterFav(!filterFav);
                }}
              />
              <input
                type="button"
                value={
                  filterBookmark
                    ? "Filtering only bookmarks..."
                    : "Filter only bookmarks"
                }
                style={{
                  display: "inline-block",
                  fontSize: "1em",
                  lineHeight: "1",
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  borderRadius: "0px",
                  padding: "1rem 1.5rem",
                  width: "21.25rem",
                  marginLeft: "30px",
                }}
                onClick={() => {
                  setFilterBookmark(!filterBookmark);
                }}
              />
            </div>
            <div
              style={{
                marginBottom: "15px",
              }}
            >
              <b>{products.length}</b> items, Total{" "}
              {totalPrice.toLocaleString()} 円
            </div>
          </div>
          <div
            style={{
              width: "100%",
              display: "grid",
              justifyContent: "center",
              gridTemplateColumns: "repeat(auto-fill, 400px)",
              columnGap: "30px",
              rowGap: "30px",
            }}
            key={products[0]}
          >
            {products.map((productId) => {
              return <ProductCell key={productId} productId={productId} />;
            })}
          </div>
        </div>
      </FilterFavContext.Provider>
    </FilterBookmarkContext.Provider>
  );
}

export default App;
