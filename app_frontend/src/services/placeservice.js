import axios from "./../interceptor";

const placeService = {
  savePlace: async (_data) => {
    const payload = await axios({
      method: "post",
      url: "/places/save",
      data: _data,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return payload.data;
  },

  getPlaces: async () => {
    const payload = await axios.get("/places");
    return payload.data;
  },

  getPlacesByCategory: async (_identifier) => {
    const payload = await axios.get(`/places?category=${_identifier}`);
    return payload.data;
  },

  getPlacesByRegion: async (_identifier) => {
    const payload = await axios.get(`/places?region=${_identifier}`);
    return payload.data;
  },

  getPlaceById: async (_identifier, _view) => {
    let url = `/places/get?id=${_identifier}`;
    if (_view) url += "&view=1";
    const payload = await axios.get(url);
    return payload.data;
  },

  deletePic: async (_identifier, _image) => {
    const payload = await axios.post(`/places/deletepic`, {
      identifier: _identifier,
      image: _image,
    });
    return payload.data;
  },

  search: async (_searchText) => {
    const payload = await axios.post("/places/search", { query: _searchText });
    return payload.data;
  },
};

export default placeService;
