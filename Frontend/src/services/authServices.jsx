import { api } from "../utilities/axios";

const authServices = () => {
  // AUTH API CALLS
  const auth = {
    signup: async (data) => await api().post("/auth/register", data),
    login: async (data) => await api().post("/auth/login", data),
    me: async () => await api().get("/auth/me"),
    forgotPassword: async (data) =>
      await api().post("/auth/forgot-password", data),
    resetPassword: async (data) =>
      await api().post("/auth/reset-password", data),
    loginStaff: async (data) => await api().post("/auth/staff/login", data),
  };

  return {
    auth,
  };
};

export default authServices;
