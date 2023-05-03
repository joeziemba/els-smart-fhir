import { Button } from "components/button/Button";
import { PatientUtil } from "utils/PatientUtil";

import "./PatientCard.scss";

export const PatientCard = ({ patient, setSelectedPatientId }) => {
  return (
    <li className="patient-card shadow">
      <div className="flex-1 text-xl">{PatientUtil.getName(patient)}</div>
      <div className="flex-1">{patient.gender}</div>
      <div className="flex-1">{PatientUtil.getBirthDate(patient)}</div>
      <Button onClick={() => setSelectedPatientId(patient.id)}>
        <i className="fa-solid fa-chevron-right"></i>
      </Button>
    </li>
  );
};
