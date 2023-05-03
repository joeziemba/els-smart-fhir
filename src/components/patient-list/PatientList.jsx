import { useEffect, useState } from "react";
import { FhirClient } from "../../utils/FhirClient";
import { PatientCard } from "../patient-card/PatientCard";

import "./PatientList.scss";

export const PatientList = ({ setSelectedPatientId }) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    if (!patients.length) {
      FhirClient.request("Patient/")
        .then((resp) => {
          const sortedPatients = resp.entry.sort((a, b) =>
            a.resource.name[0].family[0] > b.resource.name[0].family[0] ? 1 : -1
          );
          setPatients(sortedPatients);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [patients]);

  return (
    <div className="patient-list">
      <ul>
        {patients.map((patient) => {
          return <PatientCard patient={patient} setSelectedPatientId={setSelectedPatientId} />;
        })}
      </ul>
    </div>
  );
};
