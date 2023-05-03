import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { FhirClient } from "../../utils/FhirClient";
import { PatientUtil } from "../../utils/PatientUtil";

import "./PatientRecord.scss";

export const PatientRecord = ({ selectedPatientId }) => {
  const [patient, setPatient] = useState(null);
  const [patientConditions, setPatientConditions] = useState(null);

  useEffect(() => {
    if (!patient) {
      FhirClient.request(`Patient/${selectedPatientId}`)
        .then((resp) => {
          console.log(resp);
          setPatient(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [patient, selectedPatientId]);

  useEffect(() => {
    if (!patientConditions) {
      FhirClient.request(`Condition?patient=${selectedPatientId}`)
        .then((resp) => {
          console.log(resp);
          setPatientConditions(resp.entry);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [patientConditions, selectedPatientId]);

  if (!patient || !patientConditions) return <div>Loading...</div>;

  const gridData = patientConditions.map((cond) => {
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
    <div className="patient-record">
      <div className="patient-record__header">Patient Record</div>
      <div className="patient-record__details">
        <div className="patient-record__detail-entry">
          <span className="patient-record__label">Patient ID</span> {patient.id}
        </div>
        <div className="patient-record__detail-entry">
          <span className="patient-record__label">Patient Name</span> {PatientUtil.getName(patient)}
        </div>
        <div className="patient-record__detail-entry">
          <span className="patient-record__label">Gender</span>
          {patient.gender}
        </div>
        <div className="patient-record__detail-entry">
          <span className="patient-record__label">Date of Birth</span>
          {patient.birthDate}
        </div>
      </div>
      <div className="patient-record__conditions">
        <span className="patient-record__label">Active Conditions</span>
        {patientConditions.length ? (
          <div className="ag-theme-alpine" style={{ width: "100%", overflow: "hidden" }}>
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
        ) : (
          <div>No active conditions</div>
        )}
      </div>
    </div>
  );
};
