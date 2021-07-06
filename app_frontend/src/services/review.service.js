import axios from "../interceptor";
import authService from "../authService";

const commentService = {
  getReviewsByPlaceId: async (_place) => {
    const payload = await axios.get(`/reviews/${_place}`);
    return payload.data;
  },

  // removeCommentById: async (_identifier) => {
  //   const payload = await axios.delete(`/comments/${_identifier}`);
  //   return payload.data;
  // },

  removeReviewById: async (_identifier) => {
    const payload = await axios.delete(`/reviews/${_identifier}`);
    return payload.data;
  },

  // getAccountByUsername: async (_identifier) => {
  //   const payload = await axios.get("/category");
  //   return payload.data;
  // },

  // save: async (_place, _text) => {
  //   const payload = await axios.post("/comments/save", {
  //     identifier: _place,
  //     text: _text,
  //   });
  //   return payload.data;
  // },

  saveReview: async (_place, _rating, _text) => {
    const payload = await axios.post("/reviews/save", {
      identifier: _place,
      rating: _rating,
      text: _text,
    });
    return payload.data;
  },

  deleteAccount: async (_identifier) => {
    const payload = await axios.get(`/account/delete?id=${_identifier}`);
    return payload.data;
  },

  login: async (username, password) => {
    const result = await authService.login(username, password);
    return result;
  },

  info: async (username, password) => {
    const result = await axios.get("/account/info");
    return result.data;
  },
};

export default commentService;
