import { useCallback, useRef, useState } from "react";
import useSWR from "swr";
import { useIntersectionObserver } from "../hooks/intersectionObserver";
import { fetcher } from "../lib/fetcher";
import { ModelCell } from "./ModelCell";

export const ProductCell: React.FC<{ productId: string }> = ({ productId }) => {
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
