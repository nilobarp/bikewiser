import React, { Component } from "react";
import {
  FindButton,
  Header,
  InfoBox,
  Label,
  Picker,
  Wrapper
} from "./filter.elements";

export class Filter extends Component {
  constructor() {
    super();
    this.state = {
      filter: {
        location: "",
        incidentType: ""
      }
    };

    // bind instance methods
    this._triggerFind = this._triggerFind.bind(this);
  }
  render() {
    return (
      <Wrapper>
        <Header>Filter Incidents</Header>
        <Label>
          Location:
          <Picker
            id="app-filter-location-picker"
            onChange={e =>
              this.setState({
                filter: { ...this.state.filter, location: e.target.value }
              })
            }
          >
            {this.props.locations.map(location => {
              return (
                <option key={location} value={location}>
                  {location}
                </option>
              );
            })}
          </Picker>
        </Label>
        <Label>
          Type:
          <Picker
            id="app-filter-incident-type-picker"
            onChange={e =>
              this.setState({
                filter: { ...this.state.filter, incidentType: e.target.value }
              })
            }
          >
            {this.props.categories.map(category => {
              return (
                <option key={category} value={category}>
                  {category}
                </option>
              );
            })}
          </Picker>
        </Label>
        <FindButton id="app-filter-find-button" onClick={this._triggerFind}>
          Find
        </FindButton>
        <InfoBox>
          This page will retrieve 50 latest results only. For a more granular
          dataset select both location and type.
        </InfoBox>
      </Wrapper>
    );
  }

  _triggerFind() {
    this.props.onFindAction(this.state.filter);
  }
}
