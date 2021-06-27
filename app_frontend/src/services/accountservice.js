import axios from "./../interceptor";

const accountService = {
  getAccounts: async () => {
    const payload = await axios.get("/account");
    return payload.data;
  },

  getAccountByUsername: async (_identifier) => {
    const payload = await axios.get("/category");
    return payload.data;
  },

  getAccountById: async (_identifier) => {
    const payload = await axios.get("/category");
    return payload.data;
  },

  deleteAccount: async (_identifier) => {
    const payload = await axios.get(`/account/delete?id=${_identifier}`);
    return payload.data;
  },
};

export default accountService;
