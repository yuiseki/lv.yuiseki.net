import { useEffect, useState } from "react";
import { PriceRangeInput } from "./components/PriceRangeInput";
import { ProductCell } from "./components/ProductCell";
import { SearchQueryInput } from "./components/SearchQueryInput";
import { useDebounce } from "./hooks/debounce";

function App() {
  const [products, setProducts] = useState<string[] | undefined>(undefined);
  const [debouncedMinPrice, setDebouncedMinPrice] = useState(0);
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState(20000000);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounce = useDebounce(200);

  useEffect(() => {
    (async () => {
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
        .reverse()
        .map((line) => {
          return line.split(",")[0].replaceAll('"', "");
        })
        .filter((line) => {
          return line.length < 25;
        });
      const uniqProducts = [...new Set(allProducts)];
      setProducts(uniqProducts);
    })();
  }, [debouncedQuery, debouncedMinPrice, debouncedMaxPrice]);

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
          maxWidth: "21.25rem",
        }}
      >
        <input
          type="button"
          value="Shuffle"
          style={{
            fontSize: "1em",
            lineHeight: "1",
            backgroundColor: "black",
            color: "white",
            border: "none",
            borderRadius: "0px",
            padding: "1rem 1.5rem",
            width: "100%",
          }}
          onClick={shuffle}
        />
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
  );
}

export default App;
