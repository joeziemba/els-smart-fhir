import { useEffect, useState } from "react";
import { FhirClient } from "../utils/FhirClient";
import { PatientCard } from "./patient-card/PatientCard";

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
    <div style={{ width: "800px", margin: "0 auto" }}>
      <ul style={{ padding: 0 }}>
        {patients.map((patient) => {
          return <PatientCard patient={patient} setSelectedPatientId={setSelectedPatientId} />;
        })}
      </ul>
    </div>
  );
};
