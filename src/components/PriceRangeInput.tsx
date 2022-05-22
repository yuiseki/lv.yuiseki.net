import { useState } from "react";
import { PRICE_LIMIT, PRICE_STEP } from "../lib/const";

export const PriceRangeInput: React.FC<{
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
