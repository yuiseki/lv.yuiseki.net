import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

document.body.addEventListener("keydown", (e) => {
  if (e.key === "j") {
    e.preventDefault();
    if (!document.activeElement || document.activeElement.tagName === "BODY") {
      document.body.getElementsByTagName("a")[0].focus();
    }
    if (
      document &&
      document.activeElement &&
      document.activeElement.nextSibling &&
      document.activeElement.nextSibling
    ) {
      (document.activeElement.nextSibling as HTMLElement).focus();
    }
  }
  if (e.key === "k") {
    e.preventDefault();
    if (
      document &&
      document.activeElement &&
      document.activeElement.previousSibling
    ) {
      (document.activeElement.previousSibling as HTMLElement).focus();
    }
  }
});
