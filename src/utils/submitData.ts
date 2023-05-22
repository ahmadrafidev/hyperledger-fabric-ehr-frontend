import { API_ROOT } from './api';
import { PatientData } from './interface';

export const submitPatientData = (patientData: PatientData) => {
  const apiKey = sessionStorage.getItem('api-key')
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (apiKey) {
    headers.append("x-api-key", apiKey)
  }
  return fetch(`${API_ROOT}/api/assets`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(patientData),
  })
};

export const updatePatientData = (patientData: PatientData) => {
  const apiKey = sessionStorage.getItem('api-key');
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (apiKey) {
    headers.append("x-api-key", apiKey);
  }

  return fetch(`${API_ROOT}/api/assets/${patientData.ID}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(patientData),
  });
};

