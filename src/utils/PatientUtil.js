export const PatientUtil = {
  getName: (patient) => {
    const patientNames = patient.name[0];
    return patientNames.family.join(" ") + ", " + patientNames.given.join(" ");
  },
};
