import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { mount, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "./App";

Enzyme.configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty page", () => {
  expect(
    mount(<App />).contains(<div>Start by selecting a location</div>)
  ).toBe(true);
});

it("renders filter section", () => {
  const wrapper = render(<App />);
  expect(wrapper.find("#app-filter-location-picker").length).toEqual(1);
  expect(wrapper.find("#app-filter-incident-type-picker").length).toEqual(1);
  expect(wrapper.find("#app-filter-find-button").length).toEqual(1);
});
