import React from "react";

export const ModelCell: React.FC<{ productId: string; model: any }> =
  React.memo(({ productId, model }) => {
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
  });
ModelCell.displayName = "ModelCell";
