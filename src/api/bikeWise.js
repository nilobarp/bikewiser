import configuration from "../config";
import { request } from "../utils/request";
import querystring from "querystring";

const INCIDENT_API = configuration.api.incidents.replace(/\/+$/, "");

export function fetchTopResults({ location, incidentType }) {
  incidentType = incidentType || undefined;

  const queryParameters = {
    page: 1,
    per_page: configuration.maxResultsPerPage,
    incident_type: incidentType && incidentType.toLowerCase(),
    proximity: location,
    proximity_square: 100
  };

  if (!incidentType) {
    delete queryParameters.incident_type;
  }

  const url = INCIDENT_API + "?" + querystring.stringify(queryParameters);

  return request(url);
}
