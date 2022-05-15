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
          width="280"
          height="280"
          loading="lazy"
          src={model.image[0]?.contentUrl
            .replace("{IMG_WIDTH}", "280")
            .replace("{IMG_HEIGHT}", "280")}
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

const ProductCell: React.FC<{ productId: string; query: string }> = React.memo(
  ({ productId, query }) => {
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

    if (query.length > 0) {
      if (
        productData.model[0].name?.indexOf(query) === -1 &&
        productData.model[0].disambiguatingDescription?.indexOf(query) === -1 &&
        productData.model[0].category
          ?.map((cat) => {
            return cat.name;
          })
          .indexOf(query) === -1
      ) {
        return null;
      }
    }

    return (
      <>
        {productData &&
          productData.model
            .filter((model, idx) => {
              if (idx === 0) {
                return true;
              } else {
                if (model.macroColor !== productData.model[0].macroColor) {
                  return true;
                } else {
                  if (model.sizeDisplayName) {
                    return false;
                  }
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
  }
);
ProductCell.displayName = "ProductCell";

function App() {
  const [products, setProducts] = useState<string[] | undefined>(undefined);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debounce = useDebounce(500);

  useEffect(() => {
    (async () => {
      const res = await fetch("/products.txt");
      const text = await res.text();
      setProducts(
        text
          .split("\n")
          .filter((line) => {
            return line.length > 0;
          })
          .reverse()
      );
    })();
  }, []);

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
          style={{ fontSize: "2em", padding: "10px", borderRadius: "3px" }}
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
          gridTemplateColumns: "repeat(auto-fill, 300px)",
          columnGap: "20px",
          rowGap: "20px",
        }}
      >
        {products.map((productId) => {
          return (
            <ProductCell
              key={productId}
              productId={productId}
              query={debouncedQuery}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
