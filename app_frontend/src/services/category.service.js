import axios from "./../interceptor";

const categoryService = {
  getCategories: async () => {
    const payload = await axios.get("/category");
    return payload.data;
  },

  getCategory: async (_identifier) => {
    const payload = await axios.get(`/category/${_identifier}`);
    return payload.data;
  },

  saveCategory: async (_data) => {
    const payload = await axios.post("/category/create", _data);
    return payload.data;
  },

  updateCategory: async (_data) => {
    const payload = await axios.post("/category/update", _data);
    return payload.data;
  },

  deleteCategory: async (_identifier) => {
    const payload = await axios.get(`/category/delete?id=${_identifier}`);
    return payload.data;
  },
};

export default categoryService;
