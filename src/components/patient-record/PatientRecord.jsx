import { useEffect, useState } from "react";
import { ConditionTable } from "components/condition-table/ConditionTable";
import { Loading } from "components/loading/Loading";
import { FhirClient } from "utils/FhirClient";
import { PatientUtil } from "utils/PatientUtil";

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
          setPatientConditions(resp.entry ?? []);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [patientConditions, selectedPatientId]);

  if (!patient || !patientConditions) return <Loading />;

  return (
    <div className="patient-record shadow-md mb-8">
      <h1 className="patient-record__header">Patient Record</h1>
      <div className="patient-record__body">
        <div className="patient-record__details">
          <div className="flex-1">
            <div className="patient-record__label">Patient ID</div> {patient.id}
          </div>
          <div className="flex-1">
            <div className="patient-record__label">Patient Name</div> {PatientUtil.getName(patient)}
          </div>
          <div className="flex-1">
            <div className="patient-record__label">Gender</div>
            {patient.gender}
          </div>
          <div className="flex-1">
            <div className="patient-record__label">Date of Birth</div>
            {PatientUtil.getBirthDate(patient)}
          </div>
        </div>

        <div className="patient-record__label">Active Conditions</div>
        {patientConditions.length ? <ConditionTable conditions={patientConditions} /> : <div>No active conditions</div>}
      </div>
    </div>
  );
};
