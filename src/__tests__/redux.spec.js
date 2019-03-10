import fetch from "cross-fetch";

import {
  moviesReducer,
  getMovies,
  initialState,
  GET_MOVIES_REQUEST,
  GET_MOVIES_FAILURE,
  GET_MOVIES_SUCCESS
} from "../redux";

jest.mock("cross-fetch");

describe("movies-redux", () => {
  describe("moviesReducer", () => {
    it("should handle initial state", () => {
      expect(moviesReducer()).toEqual(initialState);
    });

    it("should handle unknown actions", () => {
      const action = { type: "UNKNOWN" };
      const state = initialState;
      expect(moviesReducer(state, action)).toEqual(initialState);
    });

    it(`should handle ${GET_MOVIES_REQUEST}`, () => {
      const action = { type: GET_MOVIES_REQUEST };
      const state = initialState;
      expect(moviesReducer(state, action)).toEqual({
        ...state,
        isFetching: true
      });
    });

    it(`should handle ${GET_MOVIES_FAILURE}`, () => {
      const action = { type: GET_MOVIES_FAILURE };
      const state = initialState;
      expect(moviesReducer(state, action)).toEqual({
        ...state,
        isFetching: false
      });
    });

    it(`should handle ${GET_MOVIES_SUCCESS}`, () => {
      const payload = ["movie"];
      const action = { type: GET_MOVIES_SUCCESS, payload };
      const state = initialState;
      expect(moviesReducer(state, action)).toEqual({
        movies: payload,
        isFetching: false
      });
    });
  });

  describe("getMovies", () => {
    it(`should dispatch ${GET_MOVIES_REQUEST}`, async () => {
      const payload = ["movie"];
      fetch.mockResolvedValue({ json: () => payload, ok: true, status: 200 });
      const dispatch = jest.fn();
      await getMovies()(dispatch);
      expect(dispatch).toBeCalledWith({ type: GET_MOVIES_REQUEST });
    });

    it(`should dispatch ${GET_MOVIES_FAILURE} when fetch failed`, async () => {
      fetch.mockResolvedValue({ ok: false, status: 422 });
      const dispatch = jest.fn();
      await getMovies()(dispatch);
      expect(dispatch).toBeCalledWith({
        type: GET_MOVIES_FAILURE,
        error: new Error("Invalid Response")
      });
    });

    it(`should dispatch ${GET_MOVIES_FAILURE} when fetch failed`, async () => {
      fetch.mockRejectedValue();
      const dispatch = jest.fn();
      await getMovies()(dispatch);
      expect(dispatch).toBeCalledWith({ type: GET_MOVIES_FAILURE });
    });

    it(`should dispatch ${GET_MOVIES_SUCCESS} when fetch succeeds`, async () => {
      const payload = ["movie"];
      fetch.mockResolvedValue({ json: () => payload, ok: true, status: 200 });
      const dispatch = jest.fn();
      await getMovies()(dispatch);
      expect(dispatch).toBeCalledWith({ type: GET_MOVIES_SUCCESS, payload });
    });
  });
});
