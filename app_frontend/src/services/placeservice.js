import axios from "./../interceptor";

const placeService = {
  getPlaces: async () => {
    const payload = await axios.get("/places");
    return payload.data;
  },

  getPlacesByCategory: async (_identifier) => {
    const payload = await axios.get(`/places?category=${_identifier}`);
    return payload.data;
  },
};

export default placeService;
