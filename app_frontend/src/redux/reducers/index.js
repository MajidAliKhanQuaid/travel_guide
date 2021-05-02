import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import galleryReducer from "./gallery.reducer";
import placeReducer from "./place.reducer";
import mosqueReducer from "./mosque.reducer";
import parkReducer from "./park.reducer";
import historicalReducer from "./historical.reducer";
 
//import Reduculturalcer from "./cultural.reducer";
import commonReducer from "./common.reducer";

const rootReducer = combineReducers({
  userState: userReducer,
  galleryState: galleryReducer,
  placeState: placeReducer,
  historicalState: historicalReducer,
 // culturalState: culturalReducer,
  placeState: placeReducer,
   parkState: parkReducer,
  mosqueState: mosqueReducer,
  commonState: commonReducer,
});

export default rootReducer;
