import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configure-store";
import { getMovies } from "./redux";
import App from "./components/app";

const store = configureStore();

store.dispatch(getMovies());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
