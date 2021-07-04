import axios from "./../interceptor";
import authService from "../authService";

const accountService = {
  getAccounts: async () => {
    const payload = await axios.get("/account");
    return payload.data;
  },

  // getAccountByUsername: async (_identifier) => {
  //   const payload = await axios.get("/category");
  //   return payload.data;
  // },

  register: async (_data) => {
    const payload = await axios.post("/account/register", _data);
    return payload.data;
  },

  deleteAccount: async (_identifier) => {
    const payload = await axios.get(`/account/delete?id=${_identifier}`);
    return payload.data;
  },

  login: async (username, password) => {
    const result = await authService.login(username, password);
    return result;
  },

  info: async (username, password) => {
    const result = await axios.get("/account/info");
    return result.data;
  },
};

export default accountService;
