import React, { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useDebounce } from "./debounce";
import { useIntersectionObserver } from "./intersectionObserver";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const ModelCell: React.FC<{ productId: string; model: any }> = React.memo(
  ({ productId, model }) => {
    return (
      <a
        title={
          productId +
          " / " +
          model.name +
          " / " +
          model.offers.price +
          "\n" +
          model.disambiguatingDescription
        }
        tabIndex={0}
        href={
          "https://jp.louisvuitton.com" + model.url + "/" + model.identifier
        }
        target="_blank"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textDecoration: "none",
          color: "black",
        }}
      >
        <img
          width="380"
          height="380"
          loading="lazy"
          src={model.image[0]?.contentUrl
            .replace("{IMG_WIDTH}", "380")
            .replace("{IMG_HEIGHT}", "380")}
        />
        <span
          style={{
            width: "80%",
          }}
        >
          {model.name}
        </span>
        <span
          style={{
            whiteSpace: "nowrap",
            width: "80%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {model.offers.price}
        </span>
        {model.height && (
          <span
            style={{
              width: "80%",
              paddingTop: "5px",
              fontSize: "0.8em",
            }}
          >
            Height: {model.height.value}
            {model.height.unitText}
          </span>
        )}
        {model.width && (
          <span
            style={{
              width: "80%",
              paddingTop: "5px",
              fontSize: "0.8em",
            }}
          >
            Width: {model.width.value}
            {model.width.unitText}
          </span>
        )}
        {model.depth && (
          <span
            style={{
              width: "80%",
              paddingTop: "5px",
              fontSize: "0.8em",
            }}
          >
            Depth: {model.depth.value}
            {model.depth.unitText}
          </span>
        )}
        {model.sizeDisplayName && (
          <span
            style={{
              width: "80%",
              paddingTop: "5px",
              fontSize: "0.8em",
            }}
          >
            Size: {model.sizeDisplayName}
          </span>
        )}
        {model.macroColor && (
          <span
            style={{
              width: "80%",
              paddingTop: "5px",
              fontSize: "0.8em",
            }}
          >
            Color: {model.macroColor}
          </span>
        )}
        <span
          style={{
            width: "80%",
            paddingTop: "10px",
            fontSize: "0.6em",
          }}
        >
          {model.disambiguatingDescription?.slice(0, 100)}…
        </span>
        <span
          style={{
            width: "80%",
            paddingTop: "10px",
            fontSize: "0.6em",
          }}
        >
          {model.category
            .map((cat) => {
              return cat.name;
            })
            .join(", ")}
        </span>
      </a>
    );
  }
);
ModelCell.displayName = "ModelCell";

const ProductCell: React.FC<{ productId: string }> = ({ productId }) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data: productData } = useSWR(
    shouldFetch ? `/products/${productId}.json` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const ref = useRef<HTMLAnchorElement>(null);

  const loadData = useCallback(async () => {
    setShouldFetch(true);
  }, []);
  useIntersectionObserver(ref, loadData);

  if (!productData) {
    return (
      <a ref={ref} style={{ height: "200px" }}>
        {productId}
      </a>
    );
  }

  if (
    !productData.model ||
    !productData.model[0] ||
    !productData.model[0].image ||
    !productData.model[0].image[0] ||
    !productData.model[0].offers
  ) {
    console.log(productData);
    return null;
  }

  return (
    <>
      {productData &&
        productData.model
          .filter((model, idx) => {
            if (idx === 0) {
              return true;
            } else {
              if (model.sizeDisplayName) {
                return false;
              }
              if (model.macroColor !== productData.model[0].macroColor) {
                return true;
              }
            }
          })
          .map((model) => {
            return (
              <ModelCell
                key={model.identifier}
                productId={productId}
                model={model}
              />
            );
          })}
    </>
  );
};
function App() {
  const [products, setProducts] = useState<string[] | undefined>(undefined);
  const [query, setQuery] = useState("");
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
          if (line.length > 100) {
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
        .reverse()
        .map((line) => {
          return line.split(",")[0].replaceAll('"', "");
        });
      const uniqProducts = [...new Set(allProducts)];
      setProducts(uniqProducts);
    })();
  }, [debouncedQuery]);

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
          width: "100%",
          display: "grid",
          justifyContent: "center",
          gridTemplateColumns: "repeat(auto-fill, 400px)",
          columnGap: "20px",
          rowGap: "20px",
        }}
      >
        {products.map((productId) => {
          return <ProductCell key={productId} productId={productId} />;
        })}
      </div>
    </div>
  );
}

export default App;
