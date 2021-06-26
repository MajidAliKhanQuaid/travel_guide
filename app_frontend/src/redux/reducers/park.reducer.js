export default function parkReducer(state = {}, action) {
  //console.log("park.reducer  [state]", state, " [action] ", action);
  if (action.type === "UPDATE_PLACES") {
    const { payload } = action;
    //console.log("--> park.reducer [payload] ", payload);
    return { ...state, parks: payload };
  }
  return state;
}
