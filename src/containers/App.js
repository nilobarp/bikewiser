import React, { Component } from "react";
import logo from "../assets/bike.svg";
import "../assets/App.css";
import configuration from "../config";
import { fetchTopResults } from "../api/bikeWise";
import { Incidents } from "../api/incidents";

import { EmptyPage } from "../components/emptyPage";
import { Header } from "../components/header";
import { Filter } from "../components/filter";
import { SummaryTable } from "../components/summaryTable";
import { DetailTable } from "../components/detailTable";
import { Attribution } from "../components/attribution";

class App extends Component {
  constructor() {
    super();
    this.state = {
      dataFilters: undefined,
      uiLoading: false,
      uiError: false,
      incidents: [],
      summary: []
    };

    // bind instances
    this._findIncidents = this._findIncidents.bind(this);
  }

  render() {
    return (
      <div className="app">
        <Header logo={logo} title="BikeWiser" />
        <section className="app-container">
          <aside className="app-aside">
            <Filter
              locations={[""].concat(configuration.supportedLocations)}
              categories={[""].concat(configuration.supportedEvents)}
              onFindAction={this._findIncidents}
            />
          </aside>
          <main className="app-main">
            {this.state.dataFilters ? (
              <div>
                <SummaryTable
                  summary={this.state.summary}
                  loadingState={this.state.uiLoading}
                />
                <DetailTable
                  incidents={this.state.incidents}
                  loadingState={this.state.uiLoading}
                />
              </div>
            ) : (
              <EmptyPage loading={this.state.uiLoading} />
            )}
          </main>
        </section>
        <Attribution />
      </div>
    );
  }

  async _findIncidents(filter) {
    // location is a required filter
    filter = filter.location ? filter : undefined;

    if (filter) {
      if (this._filterValueChanged(this.state.dataFilters, filter)) {
        try {
          this.setState({ uiLoading: true });
          const results = await fetchTopResults(filter);
          this.setState({
            uiLoadingMessage: "Generating stats...",
            incidents: results.incidents
          });
          const incidents = new Incidents();
          const incidentSummary = await incidents.prepareSummary(
            results.incidents
          );

          this.setState({
            dataFilters: filter,
            uiLoading: false,
            incidents: results.incidents,
            summary: incidentSummary.toArray()
          });
        } catch (e) {
          this.setState({ uiError: true });
        }
      }
    } else {
      this.setState({
        dataFilters: undefined,
        uiLoading: false
      });
    }
  }

  _filterValueChanged(oldFilter, newFilter) {
    return (
      oldFilter === undefined ||
      newFilter === undefined ||
      oldFilter.location !== newFilter.location ||
      oldFilter.incidentType !== newFilter.incidentType
    );
  }
}

export default App;
