import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configure-store";
import { getMovies } from "./redux";
import App from "./components/app";
import { Grommet } from "grommet";

const store = configureStore();

store.dispatch(getMovies());

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px"
    }
  }
};

render(
  <Provider store={store}>
    <Grommet theme={theme}>
      <App />
    </Grommet>
  </Provider>,
  document.getElementById("root")
);
