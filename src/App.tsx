import { useCallback, useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "./intersectionObserver";

const ProductCell: React.FC<{ productId: string }> = ({ productId }) => {
  const [productData, setProductData] = useState(undefined);
  const ref = useRef<HTMLDivElement>(null);

  const loadData = useCallback(async () => {
    try {
      const res = await fetch(`/products/${productId}.json`);
      const json = await res.json();
      setProductData(json);
    } catch (error) {}
  }, []);
  useIntersectionObserver(ref, loadData);

  if (!productData) {
    return (
      <div ref={ref} style={{ height: "200px" }}>
        {productId}
      </div>
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
      {productData && (
        <div
          title={
            productId +
            " / " +
            productData.model[0].name +
            " / " +
            productData.model[0].offers.price
          }
        >
          <a
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
        </div>
      )}
    </>
  );
};

function App() {
  const [products, setProducts] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const res = await fetch("/products.txt");
      const text = await res.text();
      setProducts(text.split("\n").reverse());
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
          display: "none",
        }}
      >
        <input
          type="text"
          placeholder="Search..."
          style={{ fontSize: "2em" }}
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
          return <ProductCell key={productId} productId={productId} />;
        })}
      </div>
    </div>
  );
}

export default App;
