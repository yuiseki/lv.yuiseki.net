import { useEffect, useState } from "react";
import { ProductCell } from "./components/ProductCell";
import { useDebounce } from "./hooks/debounce";

function App() {
  const [products, setProducts] = useState<string[] | undefined>(undefined);
  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounce = useDebounce(500);

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
          if (
            debouncedQuery &&
            debouncedQuery.length > 0 &&
            line.indexOf(debouncedQuery) === -1
          ) {
            return false;
          }
          return true;
        })
        .filter((line) => {
          const price = parseInt(line.split(",")[3]);
          if (maxPrice < price) {
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
  }, [debouncedQuery, maxPrice]);

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
        marginTop: "20px",
        width: "100%",
      }}
    >
      {/*
      <div
        style={{
          paddingTop: "15px",
          justifyContent: "center",
          width: "80%",
          display: "flex",
          flexDirection: "column",
          margin: "0px auto 20px",
        }}
      >
        <div
          style={{
            display: "grid",
            padding: "1rem",
          }}
        >
          <input
            style={{
              gridColumn: 1,
              gridRow: 2,
            }}
            type="range"
            name="maxPrice"
            id="maxPrice"
            value={maxPrice}
            min="0"
            max="1000000"
            step="10000"
            onChange={(e) => {
              setMaxPrice(parseInt(e.target.value));
            }}
          />
        </div>
        <div>
          <span>{0}</span>～<span>{maxPrice.toLocaleString()}円</span>
        </div>
      </div>
       */}
      <div
        style={{
          paddingTop: "15px",
          justifyContent: "center",
          width: "100%",
          display: "flex",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder={"Search " + products.length + " items..."}
          style={{
            maxWidth: "90%",
            fontSize: "2em",
            padding: "10px",
            border: "1px solid gray",
            borderRadius: "3px",
          }}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            debounce(() => {
              setDebouncedQuery(e.target.value);
            });
          }}
        />
      </div>
      <div
        style={{
          paddingTop: "15px",
          justifyContent: "center",
          width: "100%",
          display: "flex",
          marginBottom: "20px",
        }}
      >
        <input
          type="button"
          value="Shuffle"
          style={{
            fontSize: "1.5em",
            marginLeft: "10px",
            padding: "10px",
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
          columnGap: "20px",
          rowGap: "20px",
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
