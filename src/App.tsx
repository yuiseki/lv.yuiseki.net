import { useEffect, useState } from "react";
import { ProductCell } from "./components/ProductCell";
import { useDebounce } from "./hooks/debounce";

const PRICE_LIMIT = 15000000;
const PRICE_STEP = 50000;
const PriceRangeInput: React.FC<{
  onChangeMinPrice: (value: number) => void;
  onChangeMaxPrice: (value: number) => void;
}> = ({ onChangeMinPrice, onChangeMaxPrice }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(PRICE_LIMIT);
  return (
    <>
      <div
        style={{
          display: "grid",
          padding: "1rem 0px",
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
          value={minPrice}
          min="0"
          max={PRICE_LIMIT}
          step={PRICE_STEP}
          onChange={(e) => {
            const newMinPrice = parseInt(e.target.value);
            if (newMinPrice < maxPrice) {
              setMinPrice(newMinPrice);
              onChangeMinPrice(newMinPrice);
            }
          }}
        />
        <input
          style={{
            gridColumn: 2,
            gridRow: 2,
          }}
          type="range"
          name="maxPrice"
          id="maxPrice"
          value={maxPrice}
          min="0"
          max={PRICE_LIMIT}
          step={PRICE_STEP}
          onChange={(e) => {
            const newMaxPrice = parseInt(e.target.value);
            if (minPrice < newMaxPrice) {
              setMaxPrice(newMaxPrice);
              onChangeMaxPrice(newMaxPrice);
            }
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <span>{minPrice.toLocaleString()}円</span> ～{" "}
        <span>{maxPrice.toLocaleString()}円</span>
      </div>
    </>
  );
};

const SearchQueryInput: React.FC<{ onChange: (value: string) => void }> = ({
  onChange,
}) => {
  const [value, setValue] = useState("");

  return (
    <input
      type="text"
      placeholder={"Search items..."}
      style={{
        maxWidth: "90%",
        minWidth: "30%",
        fontSize: "1.5em",
        padding: "10px",
        backgroundColor: "#f6f5f3",
        border: "none",
      }}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
};

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
