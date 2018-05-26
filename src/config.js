const configurations = {
  maxResultsPerPage: 50,
  api: {
    incidents: "https://bikewise.org:443/api/v2/incidents",
    locations: "https://bikewise.org:443/api/v2/locations"
  },
  defaultHeaders: {
    "Content-Type": "application/json"
  },
  supportedLocations: ["Sydney", "Melbourne", "Brisbane"],
  supportedEvents: ["Crash", "Hazard", "Theft", "Unconfirmed"]
};

export default configurations;
