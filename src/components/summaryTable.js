import React from "react";
import configuration from "../config";
import ReactTable from "react-table";
import "react-table/react-table.css";

export function SummaryTable({ summary, loadingState }) {
  const columns = [
    {
      Header: "Summary of incidents",
      columns: [
        {
          Header: "Incident type",
          accessor: "type"
        },
        {
          Header: "Count",
          accessor: "count"
        },
        {
          Header: "Common occurrence hour",
          accessor: "commonOccurrence"
        }
      ]
    }
  ];

  return (
    <ReactTable
      style={{ width: "100%" }}
      loading={loadingState || false}
      columns={columns}
      data={summary}
      showPagination={false}
      defaultPageSize={configuration.supportedEvents.length}
      sortable={false}
    />
  );
}
