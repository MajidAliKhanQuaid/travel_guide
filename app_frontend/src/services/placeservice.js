import axios from "./../interceptor";

const placeService = {
  getPlaces: async () => {
    const payload = await axios.get("/category");
    return payload.data;
  },

  getPlace: async (_identifier) => {
    const payload = await axios.get("/category");
    return payload.data;
  },
};

export default placeService;
