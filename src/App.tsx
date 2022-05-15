import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useIntersectionObserver } from "./intersectionObserver";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const ProductCell: React.FC<{ productId: string; query: string }> = ({
  productId,
  query,
}) => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data: productData } = useSWR(
    shouldFetch ? `/products/${productId}.json` : null,
    fetcher
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
      productData.model[0].name.indexOf(query) === -1 &&
      productData.model[0].disambiguatingDescription.indexOf(query) === -1 &&
      productData.model[0].category
        .map((cat) => {
          return cat.name;
        })
        .indexOf(query) === -1
    ) {
      return null;
    }
  }

  return (
    <>
      {productData && (
        <a
          title={
            productId +
            " / " +
            productData.model[0].name +
            " / " +
            productData.model[0].offers.price
          }
          tabIndex={0}
          href={
            "https://jp.louisvuitton.com" +
            productData.model[0].url +
            "/" +
            productData.model[0].identifier
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
            src={productData.model[0].image[0].contentUrl
              .replace("{IMG_WIDTH}", "280")
              .replace("{IMG_HEIGHT}", "280")}
          />
          <span
            style={{
              width: "80%",
            }}
          >
            {productData.model[0].name}
          </span>
          <span
            style={{
              whiteSpace: "nowrap",
              width: "80%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {productData.model[0].offers.price}
          </span>
          {productData.model[0].height && (
            <span
              style={{
                width: "80%",
                paddingTop: "5px",
                fontSize: "0.8em",
              }}
            >
              Height: {productData.model[0].height.value}
              {productData.model[0].height.unitText}
            </span>
          )}
          {productData.model[0].width && (
            <span
              style={{
                width: "80%",
                paddingTop: "5px",
                fontSize: "0.8em",
              }}
            >
              Width: {productData.model[0].width.value}
              {productData.model[0].width.unitText}
            </span>
          )}
          {productData.model[0].depth && (
            <span
              style={{
                width: "80%",
                paddingTop: "5px",
                fontSize: "0.8em",
              }}
            >
              Depth: {productData.model[0].depth.value}
              {productData.model[0].depth.unitText}
            </span>
          )}
          <span
            style={{
              width: "80%",
              paddingTop: "10px",
              fontSize: "0.6em",
            }}
          >
            {productData.model[0].disambiguatingDescription?.slice(0, 100)}…
          </span>
          <span
            style={{
              width: "80%",
              paddingTop: "10px",
              fontSize: "0.6em",
            }}
          >
            {productData.model[0].category
              .map((cat) => {
                return cat.name;
              })
              .join(", ")}
          </span>
        </a>
      )}
    </>
  );
};

function App() {
  const [products, setProducts] = useState<string[] | undefined>(undefined);
  const [query, setQuery] = useState("");

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
        }}
      >
        <input
          type="text"
          placeholder={"Search " + products.length + " items..."}
          style={{ fontSize: "2em" }}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
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
            <ProductCell key={productId} productId={productId} query={query} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
