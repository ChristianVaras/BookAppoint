import Axios from "axios";

const BASE_URL = import.meta.env.VITE_LOCAL_BACK_URL;
const tokenConfig = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  }
  return {};
};
export const configToken = tokenConfig();
export const api = () => {
  return Axios.create({
    baseURL: BASE_URL + "/api/v1",
    headers: {
      "Content-Type": "application/json",
      ...configToken,
    },
  });
};
