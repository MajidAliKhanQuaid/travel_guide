import axios from "./../interceptor";

const categoryService = {
  getCategories: async () => {
    const payload = await axios.get("/category");
    return payload.data;
  },

  getCategory: async (_identifier) => {
    const payload = await axios.get("/category");
    return payload.data;
  },
};

export default categoryService;
