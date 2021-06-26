export default function culturalReducer(state = {}, action) {
  //console.log("cultural.reducer  [state]", state, " [action] ", action);
  if (action.type === "UPDATE_PLACES") {
    const { payload } = action;
    //console.log("--> cultural.reducer [payload] ", payload);
    return { ...state, culturals: payload };
  }
  return state;
}
