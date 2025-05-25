import { PriceRangeInput } from "./components/PriceRangeInput";
import { ProductCell } from "./components/ProductCell";
import { SearchQueryInput } from "./components/SearchQueryInput";
import { FilterBookmarkContext } from "./context/FilterBookmarkContext";
import { FilterLikeContext } from "./context/FilterLikeContext";
import { FilterStarContext } from "./context/FilterStarContext";
import { useProductFilters } from "./hooks/useProductFilters";
import { yenFormat } from "./lib/yen";

function App() {
  const {
    products,
    totalPrice,
    minPrice,
    maxPrice,
    query,
    filterLike,
    filterBookmark,
    filterStar,
    setMinPrice,
    setMaxPrice,
    setQuery,
    toggleLike,
    toggleBookmark,
    toggleStar,
    shuffle,
  } = useProductFilters();

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
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  onChangeMinPrice={setMinPrice}
                  onChangeMaxPrice={setMaxPrice}
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
                    query={query}
                    onChange={setQuery}
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
                    onClick={toggleLike}
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
                    onClick={toggleStar}
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
                    onClick={toggleBookmark}
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
