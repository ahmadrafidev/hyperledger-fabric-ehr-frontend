import { API_ROOT } from './api';
import { PatientData } from './interface';

export const submitPatientData = (patientData: PatientData) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return fetch(`${API_ROOT}/api/assets`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(patientData),
  });
};
