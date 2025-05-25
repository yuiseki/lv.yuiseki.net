import { useState } from "react";
import { PRICE_LIMIT, PRICE_STEP } from "../lib/const";
import { yenFormat } from "../lib/yen";

export const PriceRangeInput: React.FC<{
  minPrice: number;
  maxPrice: number;
  onChangeMinPrice: (value: number) => void;
  onChangeMaxPrice: (value: number) => void;
}> = ({ minPrice, maxPrice, onChangeMinPrice, onChangeMaxPrice }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexBasis: "auto",
          padding: "0px",
        }}
      >
        <input
          style={{
            flexGrow: 1,
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
              onChangeMinPrice(newMinPrice);
            }
          }}
        />
        <div style={{ flexGrow: 1, textAlign: "center" }}>
          <span>{yenFormat(minPrice)}</span> ～{" "}
          <span>{yenFormat(maxPrice)}</span>
        </div>
        <input
          style={{
            flexGrow: 1,
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
              onChangeMaxPrice(newMaxPrice);
            }
          }}
        />
      </div>
    </>
  );
};
