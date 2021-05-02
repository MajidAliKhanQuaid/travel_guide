export default function historicalReducer(state = {}, action) {
  console.log("historical.reducer  [state]", state, " [action] ", action);
  if (action.type === "UPDATE_PLACES") {
    const { payload } = action;
    console.log("--> historical.reducer [payload] ", payload);
    return { ...state, historicals: payload };
  }
  return state;
}
