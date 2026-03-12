import api from "../lib/api";

interface LoginAdminPayload {
  email: string;
  motDePasse: string;
}

interface LoginUserPayload {
  matricule: string;
  motDePasse: string;
}

const LoginService = {
  loginAdmin: async (payload: LoginAdminPayload) => {
    const response = await api.post("/auth/login", payload);
    return response.data;
  },

  loginUser: async (payload: LoginUserPayload) => {
    const response = await api.post("/auth/login-matricule", payload);
    return response.data;
  },
};

export default LoginService;
