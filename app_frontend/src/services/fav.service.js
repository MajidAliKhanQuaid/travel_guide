import axios from "../interceptor";

const favService = {
  getFavs: async () => {
    const payload = await axios.get("/favourites");
    return payload.data;
  },

  addToFavs: async (_identifier) => {
    const payload = await axios.get(
      `/favourites/add?identifier=${_identifier}&category=place`
    );
    return payload.data;
  },

  removeFromFavs: async (_identifier) => {
    const payload = await axios.get(
      `/favourites/remove?identifier=${_identifier}&category=place`
    );
    return payload.data;
  },
};

export default favService;
