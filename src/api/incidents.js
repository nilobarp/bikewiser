import * as stat from "jStat";
import { isArray } from "util";

export class Incidents {
  summary = {
    Crash: {
      type: "Crash",
      count: 0,
      occurrences: [],
      commonOccurrence: 0
    },
    Hazard: {
      type: "Hazard",
      count: 0,
      occurrences: [],
      commonOccurrence: 0
    },
    Theft: {
      type: "Theft",
      count: 0,
      occurrences: [],
      commonOccurrence: 0
    },
    Unconfirmed: {
      type: "Unconfirmed",
      count: 0,
      occurrences: [],
      commonOccurrence: 0
    }
  };

  summary() {
    return this.summary;
  }

  async prepareSummary(incidents) {
    return new Promise((resolve, reject) => {
      try {
        for (const incident of incidents) {
          this.summary[incident.type]["count"] += 1;
          this.summary[incident.type]["occurrences"].push(
            this._occurrenceHour(incident.occurred_at)
          );
        }

        this._commonOccurrences(this.summary);

        resolve(this);
      } catch (e) {
        reject(e);
      }
    });
  }

  toArray() {
    return Object.keys(this.summary).reduce((accumulator, key) => {
      const incident = this.summary[key];
      const formattedHour =
        incident.commonOccurrence !== undefined
          ? (incident.commonOccurrence + ":00").padStart(5, "0")
          : "--:--";
      return accumulator.concat({
        ...incident,
        commonOccurrence: formattedHour
      });
    }, []);
  }

  _occurrenceHour(timestamp) {
    const currentDate = new Date();
    const localTimestamp =
      timestamp * 1000 + currentDate.getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(localTimestamp);
    localDate.setHours(
      localDate.getHours() + Math.round(localDate.getMinutes() / 60)
    );

    return localDate.getHours();
  }

  _commonOccurrences(summaryObject) {
    const props = Object.keys(summaryObject);
    for (const prop of props) {
      summaryObject[prop].commonOccurrence = this._earliestHour(
        summaryObject[prop].occurrences
      );
    }
    return summaryObject;
  }

  _earliestHour(hourDistributions) {
    const bins = stat.mode(hourDistributions);
    if (isArray(bins)) {
      return Math.min.apply(null, hourDistributions);
    }
    return bins;
  }
}
