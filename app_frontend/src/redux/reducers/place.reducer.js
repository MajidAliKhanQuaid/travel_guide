export default function placeReducer(state = {}, action) {
  //console.log("place.reducer  [state]", state, " [action] ", action);
  if (action.type === "UPDATE_PLACES") {
    const { payload } = action;
    //console.log("--> place.reducer [payload] ", payload);
    return { ...state, places: payload };
  }
  return state;
}
