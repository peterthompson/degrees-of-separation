import fetch from "cross-fetch";
import config from "./config";

export const GET_MOVIES_REQUEST = "GET_MOVIES_REQUEST";
export const GET_MOVIES_FAILURE = "GET_MOVIES_FAILURE";
export const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS";

export const initialState = {
  isFetching: false,
  movies: []
};

export const moviesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_MOVIES_REQUEST:
      return {
        isFetching: true,
        movies: []
      };
    case GET_MOVIES_SUCCESS:
      return {
        isFetching: false,
        movies: action.payload
      };
    case GET_MOVIES_FAILURE:
      return {
        isFetching: false,
        movies: []
      };
    default:
      return state;
  }
};

export function getMovies() {
  return async dispatch => {
    try {
      dispatch({ type: GET_MOVIES_REQUEST });
      const response = await fetch(config.moviesUrl);
      if (!response.ok) throw new Error("Invalid Response");
      const json = await response.json();
      dispatch({ type: GET_MOVIES_SUCCESS, payload: json });
    } catch (error) {
      dispatch({ type: GET_MOVIES_FAILURE, error });
    }
  };
}

export default moviesReducer;
