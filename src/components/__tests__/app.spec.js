import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import Downshift from "downshift";
import { initialState } from "../../redux";
import ConnectedComponent from "../app";
import { Form, Text } from "grommet";

const App = ConnectedComponent.WrappedComponent;

const moviesJson = [
  {
    title: "Holmes and Watson",
    cast: [
      "Will Ferrell",
      "John C. Reilly",
      "Rebecca Hall",
      "Ralph Fiennes",
      "Rob Brydon",
      "Kelly Macdonald",
      "Lauren Lapkus",
      "Hugh Laurie"
    ]
  },
  {
    title: "A Night at the Roxbury",
    cast: ["Will Ferrell", "Chris Kattan", "Dan Hedaya", "Loni Anderson"]
  },
  {
    title: "Corky Romano",
    cast: ["Chris Kattan", "Peter Falk", "Fred Ward"]
  }
];

function mockStore(state = initialState) {
  return configureStore([thunk])(state);
}

describe("app", () => {
  it("should render loading state when data is fetching", () => {
    const store = mockStore({ isFetching: true, movies: [] });
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedComponent />
      </Provider>
    );
    expect(wrapper.find("p").text()).toEqual("Loading…");
  });

  it("should render the form when data has loaded", () => {
    const store = mockStore({ isFetching: false, movies: moviesJson });
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedComponent />
      </Provider>
    );
    expect(wrapper.find("form").length).toEqual(1);
  });

  it("should render an error message when the form is submitted without valid input", () => {
    const store = mockStore({ isFetching: false, movies: moviesJson });
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedComponent />
      </Provider>
    );
    wrapper.find(Form).simulate("submit");
    expect(
      wrapper
        .find(Text)
        .at(2)
        .text()
    ).toEqual("Please select a source and target movie");
  });

  it("should render an error message when no path is found", () => {
    const store = mockStore({ isFetching: false, movies: moviesJson });
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedComponent />
      </Provider>
    );

    wrapper
      .find(Downshift)
      .at(0)
      .prop("onChange")("Holmes and Watson");

    wrapper
      .find(Downshift)
      .at(1)
      .prop("onChange")("Corky Romano");

    wrapper.find("form").simulate("submit");

    expect(wrapper.find(".result").text()).toEqual(
      "Holmes and WatsonWill FerrellA Night at the RoxburyChris KattanCorky Romano"
    );
  });
});
