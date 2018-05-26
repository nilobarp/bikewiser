import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { mount, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Filter } from "./filter";

Enzyme.configure({ adapter: new Adapter() });

it("sets filter values in state", () => {
  const findActionSpy = jest.fn();
  const wrapper = shallow(
    <Filter
      locations={["", "Sydney"]}
      categories={["", "Unconfirmed"]}
      onFindAction={findActionSpy}
    />
  );

  expect(wrapper.state()).toEqual({
    filter: { incidentType: "", location: "" }
  });

  const locationPicker = wrapper.find("#app-filter-location-picker");
  locationPicker.simulate("change", { target: { value: "Sydney" } });
  wrapper.find("#app-filter-find-button").simulate("click");

  expect(wrapper.state()).toEqual({
    filter: { incidentType: "", location: "Sydney" }
  });

  expect(findActionSpy).toHaveBeenCalledWith({
    incidentType: "",
    location: "Sydney"
  });
});
