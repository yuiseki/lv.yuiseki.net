import { useEffect, useState } from "react";
import { PriceRangeInput } from "./components/PriceRangeInput";
import { ProductCell } from "./components/ProductCell";
import { SearchQueryInput } from "./components/SearchQueryInput";
import { FilterBookmarkContext } from "./context/FilterBookmarkContext";
import { FilterLikeContext } from "./context/FilterLikeContext";
import { useDebounce } from "./hooks/debounce";
import { useLocalStorage } from "./hooks/localStorage";
import { PRICE_LIMIT } from "./lib/const";
import { yenFormat } from "./lib/yen";
import { FilterStarContext } from "./context/FilterStarContext";

function App() {
  const [products, setProducts] = useState<string[] | undefined>(undefined);

  const debounce = useDebounce(200);
  const [debouncedMinPrice, setDebouncedMinPrice] = useState(0);
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(PRICE_LIMIT);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filterLike, setFilterLike] = useState(false);
  const [filterBookmark, setFilterBookmark] = useState(false);
  const [filterStar, setFilterStar] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    (async () => {
      // filter like
      let likeProducts: Array<string | undefined> = [];
      if (filterLike) {
        likeProducts = Object.entries(localStorage)
          .map((entry) => {
            if (entry[0].startsWith("lv-fav-") && JSON.parse(entry[1])) {
              return entry[0].split("-")[2];
            }
          })
          .filter((v) => v);
      }
      console.log("like: ", likeProducts);

      // filter bookmark
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

      // filter star
      let starProducts: Array<string | undefined> = [];
      if (filterStar) {
        starProducts = Object.entries(localStorage)
          .map((entry) => {
            if (entry[0].startsWith("lv-star-") && JSON.parse(entry[1])) {
              return entry[0].split("-")[2];
            }
          })
          .filter((v) => v);
      }
      console.log("star: ", starProducts);

      // fetch search_00.csv to search_99.csv
      const numbers = [...new Array(10).keys()].map((n) => n);
      const allTexts: string[] = [];
      for (const n of numbers) {
        const res = await fetch(`/search_${n.toString().padStart(2, "0")}.csv`);
        const text = await res.text();
        allTexts.push(text);
      }

      const text = allTexts.join("\n");
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
          const price = parseInt(line.split(",")[2]);
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
          return [line.split(",")[0].replaceAll('"', ""), line.split(",")[2]];
        })
        //.filter((line) => {
        //  return line.length < 25;
        //})
        .filter((line) => {
          if (filterLike) {
            return likeProducts.indexOf(line[0]) > -1;
          }
          return true;
        })
        .filter((line) => {
          if (filterBookmark) {
            return bookmarkProducts.indexOf(line[0]) > -1;
          }
          return true;
        })
        .filter((line) => {
          if (filterStar) {
            return starProducts.indexOf(line[0]) > -1;
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
    filterLike,
    filterBookmark,
    filterStar,
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
      <FilterLikeContext.Provider value={filterLike}>
        <FilterStarContext.Provider value={filterStar}>
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
                  width: "90%",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "30px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexGrow: 10,
                  }}
                >
                  <SearchQueryInput
                    onChange={(value) => {
                      if (!value || value.length === 0) {
                        return;
                      }
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
                    display: "flex",
                    flexGrow: 0,
                    marginLeft: "30px",
                  }}
                >
                  <button
                    style={{
                      display: "inline-block",
                      fontSize: "1em",
                      lineHeight: "1",
                      backgroundColor: "black",
                      color: "white",
                      border: "none",
                      borderRadius: "0px",
                      padding: "1rem",
                    }}
                    onClick={shuffle}
                  >
                    <span className="fa-solid fa-random"></span>
                  </button>
                  <button
                    style={{
                      display: "inline-block",
                      fontSize: "1em",
                      lineHeight: "1",
                      backgroundColor: "black",
                      color: "white",
                      border: "none",
                      borderRadius: "0px",
                      padding: "1rem",
                      marginLeft: "30px",
                    }}
                    onClick={() => {
                      setFilterLike(!filterLike);
                    }}
                  >
                    {filterLike ? (
                      <span className="fa-solid fa-heart"></span>
                    ) : (
                      <span className="fa-regular fa-heart"></span>
                    )}
                  </button>
                  <button
                    style={{
                      display: "inline-block",
                      fontSize: "1em",
                      lineHeight: "1",
                      backgroundColor: "black",
                      color: "white",
                      border: "none",
                      borderRadius: "0px",
                      padding: "1rem",
                      marginLeft: "30px",
                    }}
                    onClick={() => {
                      setFilterStar(!filterStar);
                    }}
                  >
                    {filterStar ? (
                      <span className="fa-solid fa-star"></span>
                    ) : (
                      <span className="fa-regular fa-star"></span>
                    )}
                  </button>
                  <button
                    style={{
                      display: "inline-block",
                      fontSize: "1em",
                      lineHeight: "1",
                      backgroundColor: "black",
                      color: "white",
                      border: "none",
                      borderRadius: "0px",
                      padding: "1rem",
                      marginLeft: "30px",
                    }}
                    onClick={() => {
                      setFilterBookmark(!filterBookmark);
                    }}
                  >
                    {filterBookmark ? (
                      <span className="fa-solid fa-bookmark"></span>
                    ) : (
                      <span className="fa-regular fa-bookmark"></span>
                    )}
                  </button>
                </div>
              </div>
              <div
                style={{
                  marginBottom: "15px",
                }}
              >
                <b>{products.length}</b> items,{" "}
                <b>計 {yenFormat(totalPrice)}</b>
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
        </FilterStarContext.Provider>
      </FilterLikeContext.Provider>
    </FilterBookmarkContext.Provider>
  );
}

export default App;
