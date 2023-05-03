import { PatientUtil } from "../../utils/PatientUtil";
import { Button } from "../button/Button";

import "./PatientCard.scss";

export const PatientCard = ({ patient, setSelectedPatientId }) => {
  return (
    <li className="patient-card">
      <div className="patient-card__name" style={{ flex: 1 }}>
        {PatientUtil.getName(patient.resource)}
      </div>
      <div className="patient-card__gender" style={{ flex: 1 }}>
        {patient.resource.gender}
      </div>
      <div className="patient-card__dob" style={{ flex: 1 }}>
        {patient.resource.birthDate}
      </div>
      <Button onClick={() => setSelectedPatientId(patient.resource.id)}>
        <i className="fa-solid fa-chevron-right"></i>
      </Button>
    </li>
  );
};
