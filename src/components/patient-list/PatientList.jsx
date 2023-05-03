import { Loading } from "components/loading/Loading";
import { PatientCard } from "components/patient-card/PatientCard";
import { useEffect, useState } from "react";
import { FhirClient } from "utils/FhirClient";

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

  if (!patients.length) return <Loading />;

  return (
    <div className="patient-list">
      <ul>
        {patients.map((patient) => {
          return <PatientCard patient={patient.resource} setSelectedPatientId={setSelectedPatientId} />;
        })}
      </ul>
    </div>
  );
};
