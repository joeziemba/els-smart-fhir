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

  if (!patient) return <div>Loading...</div>;

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
        {patientConditions &&
          patientConditions.map((cond) => {
            return (
              <div
                style={{
                  display: "flex",
                  marginBlock: "1rem",
                  borderBlockEnd: "1px solid #efefef",
                  paddingBlockEnd: "1rem",
                }}
              >
                <div style={{ flex: 2 }}>{cond.resource.code.text}</div>
                <div style={{ flex: 1 }}>Onset: {cond.resource.onsetDateTime}</div>
                <div style={{ flex: 1 }}>
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/?term=${cond.resource.code.text}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on PubMed
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
