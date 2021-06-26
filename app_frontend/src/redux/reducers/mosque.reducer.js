export default function mosqueReducer(state = {}, action) {
  //console.log("mosque.reducer  [state]", state, " [action] ", action);
  if (action.type === "UPDATE_PLACES") {
    const { payload } = action;
    //console.log("--> mosque.reducer [payload] ", payload);
    return { ...state, mosques: payload };
  }
  return state;
}
