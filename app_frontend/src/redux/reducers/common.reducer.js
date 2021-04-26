const initialState = {
  displayNav: true,
  showSpinner: false,
  showSearchBtn: true,
  searchText: "",
};
export default function commonReducer(state = initialState, action) {
  console.log("common.reducer  [state]", state, " [action] ", action);
  if (action.type == "TOGGLE_NAV") {
    const { payload } = action;
    return { ...state, displayNav: payload };
  }

  if (action.type == "TOGGLE_SPINNER") {
    const { payload } = action;
    return { ...state, showSpinner: payload };
  }

  if (action.type == "SEARCH_TEXT") {
    const { payload } = action;
    return { ...state, searchText: payload };
  }

  if (action.type == "TOGGLE_SEARCH_BTN") {
    const { payload } = action;
    return { ...state, showSearchBtn: payload };
  }

  if (action.type == "CHANGE_SEARCH_CATEGORY") {
    const { payload } = action;
    return { ...state, searchCategory: payload };
  }

  return state;
}
