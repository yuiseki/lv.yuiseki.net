import React from "react";
import { useLocalStorage } from "../hooks/localStorage";

export const ModelCell: React.FC<{ productId: string; model: any }> =
  React.memo(({ productId, model }) => {
    const [fav, setFav] = useLocalStorage(
      "fav-" + productId + "-" + model.identifier,
      false
    );
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
          backgroundColor: "transparent",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            backgroundColor: "#f6f5f3",
          }}
        >
          {fav ? (
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                fontSize: "1em",
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFav(!fav);
              }}
              className="fa-solid fa-heart"
            ></span>
          ) : (
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                fontSize: "1em",
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFav(!fav);
              }}
              className="fa-regular fa-heart"
            ></span>
          )}
          <picture
            style={{
              width: "100%",
              backgroundColor: "transparent",
            }}
          >
            <img
              loading="lazy"
              sizes="656px"
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "transparent",
              }}
              srcSet={
                model.image[0]?.contentUrl
                  .replace("{IMG_WIDTH}", "656")
                  .replace("{IMG_HEIGHT}", "656")
                  .replace(" ", "%20")
                  .replace("jpg", "png") + " 656w"
              }
            />
          </picture>
        </div>
        <span
          style={{
            marginTop: "10px",
            width: "100%",
          }}
        >
          {model.name}
        </span>
        <span
          style={{
            whiteSpace: "nowrap",
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {model.offers.price}
        </span>
        {model.height && (
          <span
            style={{
              width: "100%",
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
              width: "100%",
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
              width: "100%",
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
              width: "100%",
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
              width: "100%",
              paddingTop: "5px",
              fontSize: "0.8em",
            }}
          >
            Color: {model.macroColor}
          </span>
        )}
        <span
          style={{
            width: "100%",
            paddingTop: "10px",
            fontSize: "0.6em",
          }}
        >
          {model.disambiguatingDescription?.slice(0, 100)}…
        </span>
        <span
          style={{
            width: "100%",
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
  });
ModelCell.displayName = "ModelCell";
