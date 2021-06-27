import axios from "./../interceptor";

const favService = {
  getFavs: async () => {
    const payload = await axios.get("/favourites");
    return payload.data;
  },

  addToFavs: async (_identifier) => {
    const payload = await axios.get("/category");
    return payload.data;
  },

  removeFromFavs: async (_identifier) => {
    const payload = await axios.get("/favourites/remove", {
      params: {
        identifier: _identifier,
      },
    });
    return payload.data;
  },
};

export default favService;
