import { API_ROOT } from "./api";

export const login = (email: string, password: string) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  return fetch(`${API_ROOT}/api/auth`, {
    method: "POST",
    mode: "no-cors",
    headers: headers,
    body: JSON.stringify({ email, password }),
  });
};
