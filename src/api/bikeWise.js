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

// export function prepareSummary(incidents) {
//   return new Promise((resolve, reject) => {
//     const incidentSummary = {
//       Crash: {
//         type: "Crash",
//         count: 0,
//         occurrences: [],
//         commonOccurrence: 0
//       },
//       Hazard: {
//         type: "Hazard",
//         count: 0,
//         occurrences: [],
//         commonOccurrence: 0
//       },
//       Theft: {
//         type: "Theft",
//         count: 0,
//         occurrences: [],
//         commonOccurrence: 0
//       },
//       Unconfirmed: {
//         type: "Unconfirmed",
//         count: 0,
//         occurrences: [],
//         commonOccurrence: 0
//       }
//     };

//     try {
//       for (const incident of incidents) {
//         incidentSummary[incident.type]["count"] += 1;
//         incidentSummary[incident.type]["occurrences"].push(
//           occurrenceHour(incident.occurred_at)
//         );
//       }
//       commonOccurrences(incidentSummary);

//       const summary = summaryObjectToArray(incidentSummary);

//       resolve(summary);
//     } catch (e) {
//       reject(e);
//     }
//   });
// }

// function occurrenceHour(timestamp) {
//   const currentDate = new Date();
//   const localTimestamp =
//     timestamp * 1000 + currentDate.getTimezoneOffset() * 60 * 1000;
//   const localDate = new Date(localTimestamp);
//   localDate.setHours(
//     localDate.getHours() + Math.round(localDate.getMinutes() / 60)
//   );

//   return localDate.getHours();
// }

// function commonOccurrences(summaryObject) {
//   const props = Object.keys(summaryObject);
//   for (const prop of props) {
//     summaryObject[prop].commonOccurrence = earliestHour(
//       summaryObject[prop].occurrences
//     );
//   }
//   return summaryObject;
// }

// function earliestHour(hourDistributions) {
//   const bins = stat.mode(hourDistributions);
//   if (isArray(bins)) {
//     return Math.min.apply(null, hourDistributions);
//   }
//   return bins;
// }

// function summaryObjectToArray(summary) {
//   return Object.keys(summary).reduce((accumulator, key) => {
//     const incident = summary[key];
//     const formattedHour =
//       incident.commonOccurrence !== undefined
//         ? (incident.commonOccurrence + ":00").padStart(5, "0")
//         : "--:--";
//     return accumulator.concat({ ...incident, commonOccurrence: formattedHour });
//   }, []);
// }
