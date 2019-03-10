import fetch from "cross-fetch";
import config from "./config";

export const GET_MOVIES_REQUEST = "GET_MOVIES_REQUEST";
export const GET_MOVIES_FAILURE = "GET_MOVIES_FAILURE";
export const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS";

export const initialState = {
  isFetching: false,
  movies: []
};

export const moviesReducer = (state = initialState, action = {}) => {};

export function getMovies() {}

export default moviesReducer;
