import axios from "./../interceptor";

const categoryService = {
  getCategories: async () => {
    const payload = await axios.get("/category");
    return payload.data;
  },

  deleteCategory: async (_identifier) => {
    const payload = await axios.get(`/category/delete?id=${_identifier}`);
    return payload.data;
  },
};

export default categoryService;
