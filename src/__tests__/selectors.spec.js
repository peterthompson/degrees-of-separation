import { movieTitlesSelector } from "../selectors";

describe("movieTitlesSelector", () => {
  it("should return movie titles", () => {
    const state = { movies: [{ title: "title", cast: ["actor"] }] };
    const stateSlice = ["title"];

    expect(movieTitlesSelector(state)).toEqual(stateSlice);
    movieTitlesSelector({ ...state, changed: "state" });
    expect(movieTitlesSelector.recomputations()).toEqual(1);
  });
});
