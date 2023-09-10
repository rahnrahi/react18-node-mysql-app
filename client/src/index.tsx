import * as React from "react";
import ReactDOM from "react-dom/client";

// Use consistent styling
import "sanitize.css/sanitize.css";

import { App } from "app";

import { HelmetProvider } from "react-helmet-async";

import { Provider } from "react-redux";

import { store } from "./app/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </>
);
