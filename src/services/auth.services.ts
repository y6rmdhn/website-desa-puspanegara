import axiosInstance from "../lib/axiosInstance";

type ILogin = {
  username: string;
  password: string;
};

const authServices = {
  login: (payload: ILogin) => axiosInstance.post(`/login`, payload),
  logout: () => axiosInstance.post(`/log-out`),
};

export default authServices;
