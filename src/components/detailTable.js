import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { toLocalDate } from "../utils/date";

export function DetailTable({ incidents, loadingState }) {
  const columns = [
    {
      Header: "Incident details",
      columns: [
        {
          Header: "Incident type",
          accessor: "type",
          maxWidth: 120
        },
        {
          Header: "Occurrence Date",
          accessor: "occurred_at",
          Cell: row => `${toLocalDate(row.value, true).toLocaleString()}`,
          maxWidth: 180
        },
        {
          Header: "Title",
          accessor: "title",
          sortable: false,
          Cell: row => <span title={row.value}>{row.value}</span>
        },
        {
          Header: "Address",
          accessor: "address",
          sortable: false,
          Cell: row => <span title={row.value}>{row.value}</span>
        }
      ]
    }
  ];

  return (
    <ReactTable
      style={{ width: "100%" }}
      loading={loadingState || false}
      columns={columns}
      data={incidents}
      showPagination={true}
      showPageSizeOptions={false}
      defaultPageSize={10}
      sortable={true}
    />
  );
}
