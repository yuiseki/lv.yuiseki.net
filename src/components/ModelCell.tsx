import React, { useCallback, useContext } from "react";
import { FilterBookmarkContext } from "../context/FilterBookmarkContext";
import { FilterLikeContext } from "../context/FilterLikeContext";
import { FilterStarContext } from "../context/FilterStarContext";
import { useLocalStorage } from "../hooks/localStorage";
import { yenFormat } from "../lib/yen";

export const ModelCell: React.FC<{ productId: string; model: any }> =
  React.memo(({ productId, model }) => {
    const [like, setLike] = useLocalStorage(
      "lv-fav-" + productId + "-" + model.identifier,
      false
    );

    const [bookmark, setBookmark] = useLocalStorage(
      "lv-bookmark-" + productId + "-" + model.identifier,
      false
    );

    const [star, setStar] = useLocalStorage(
      "lv-star-" + productId + "-" + model.identifier,
      false
    );

    const filterLike = useContext(FilterLikeContext);
    const filterBookmark = useContext(FilterBookmarkContext);
    const filterStar = useContext(FilterStarContext);

    if (filterLike && !like) {
      return null;
    }

    if (filterBookmark && !bookmark) {
      return null;
    }

    if (filterStar && !star) {
      return null;
    }

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
            width: "400px",
            height: "400px",
            backgroundColor: "#f6f5f3",
          }}
        >
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              fontSize: "1em",
              padding: "10px",
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setBookmark(!bookmark);
            }}
            className={
              bookmark ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"
            }
          ></span>
          <span
            style={{
              position: "absolute",
              right: "65px",
              top: "10px",
              fontSize: "1em",
              padding: "10px",
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLike(!like);
            }}
            className={like ? "fa-solid fa-heart" : "fa-regular fa-heart"}
          ></span>
          <span
            style={{
              position: "absolute",
              right: "35px",
              top: "10px",
              fontSize: "1em",
              padding: "10px",
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setStar(!star);
            }}
            className={star ? "fa-solid fa-star" : "fa-regular fa-star"}
          ></span>
          <picture
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
            }}
          >
            <img
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
          {yenFormat(
            parseInt(model.offers.price.replace(/¥/g, "").replace(/,/g, ""))
          )}
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
