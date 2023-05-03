export const PatientUtil = {
  getName: (patient) => {
    const patientNames = patient.name[0];
    return patientNames.family.join(" ") + ", " + patientNames.given.join(" ");
  },
  getBirthDate: (patient) => new Date(patient.birthDate).toLocaleDateString(),
};
