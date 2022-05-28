import { useEffect, useState } from "react";
import { PriceRangeInput } from "./components/PriceRangeInput";
import { ProductCell } from "./components/ProductCell";
import { SearchQueryInput } from "./components/SearchQueryInput";
import { FilterFavContext } from "./context/FilterFavContext";
import { useDebounce } from "./hooks/debounce";
import { useLocalStorage } from "./hooks/localStorage";

function App() {
  const [products, setProducts] = useState<string[] | undefined>(undefined);

  const debounce = useDebounce(200);
  const [debouncedMinPrice, setDebouncedMinPrice] = useState(0);
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(20000000);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filterFav, setFilterFav] = useState(false);

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
      console.log(favProducts);
      const res = await fetch("/search.csv");
      const text = await res.text();
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
                return q.length === 0 || line.indexOf(q) > 0;
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
          return line.split(",")[0].replaceAll('"', "");
        })
        .filter((line) => {
          return line.length < 25;
        })
        .filter((line) => {
          if (filterFav) {
            return favProducts.indexOf(line) > -1;
          }
          return true;
        });
      const uniqProducts = [...new Set(allProducts)];
      setProducts(uniqProducts);
    })();
  }, [debouncedQuery, debouncedMinPrice, debouncedMaxPrice, filterFav]);

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
    <FilterFavContext.Provider value={filterFav}>
      <div
        style={{
          marginTop: "30px",
          width: "100%",
          minHeight: "110vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flexStart",
          alignItems: "center",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            maxWidth: "90%",
            minWidth: "90%",
            display: "flex",
            flexDirection: "column",
            marginBottom: "30px",
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
            justifyContent: "center",
            width: "100%",
            display: "flex",
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
            marginBottom: "30px",
            maxWidth: "100%",
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
            value={filterFav ? "Filtering only likes..." : "Filter only likes"}
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
        </div>
        <div
          style={{
            marginBottom: "30px",
          }}
        >
          {products.length} items
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
  );
}

export default App;
