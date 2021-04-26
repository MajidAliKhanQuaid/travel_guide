import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import galleryReducer from "./gallery.reducer";
import placeReducer from "./place.reducer";
import commonReducer from "./common.reducer";

const rootReducer = combineReducers({
  userState: userReducer,
  galleryState: galleryReducer,
  placeState: placeReducer,
  commonState: commonReducer,
});

export default rootReducer;
