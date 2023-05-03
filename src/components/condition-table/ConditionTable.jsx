import { AgGridReact } from "ag-grid-react";

export const ConditionTable = ({ conditions }) => {
  const gridData = conditions.map((cond) => {
    return {
      name: cond.resource.code.text,
      onset: cond.resource.onsetDateTime,
      link: `https://pubmed.ncbi.nlm.nih.gov/?term=${cond.resource.code.text}`,
    };
  });

  const columnDef = [
    { field: "name", sortable: true, flex: 3, headerName: "Condition Name", initialSort: "asc" },
    { field: "onset", sortable: true, flex: 1 },
    {
      field: "link",
      flex: 1,
      cellRenderer: (params) => (
        <a href={params.value} target="_blank" rel="noreferrer">
          View on PubMed <i className="fa-solid fa-arrow-up-right-from-square fa-xs"></i>
        </a>
      ),
    },
  ];
  return (
    <div className="ag-theme-alpine mt-4" style={{ width: "100%", overflow: "hidden" }}>
      <AgGridReact
        defaultColDef={{
          resizable: true,
          suppressMovable: true,
          sizeColumnsToFit: true,
          sortingOrder: ["asc", "desc"],
        }}
        columnDefs={columnDef}
        rowData={gridData}
        domLayout="autoHeight"
      />
    </div>
  );
};
