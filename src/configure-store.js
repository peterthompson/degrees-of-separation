import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import moviesReducer from "./redux";

function configureStore() {
  const store = createStore(
    moviesReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
}

export default configureStore;
