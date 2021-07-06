import axios from "../interceptor";

const recentlyViewedService = {
  getAll: async () => {
    const payload = await axios.post("/places/recentlyviewed");
    return payload.data;
  },

  // remove: async (_identifier) => {
  //   const payload = await axios.get("/category");
  //   return payload.data;
  // },

  // getAccountById: async (_identifier) => {
  //   const payload = await axios.get("/category");
  //   return payload.data;
  // },

  // deleteAccount: async (_identifier) => {
  //   const payload = await axios.get(`/account/delete?id=${_identifier}`);
  //   return payload.data;
  // },
};

export default recentlyViewedService;
