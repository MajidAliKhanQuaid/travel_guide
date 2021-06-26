const initialState = {
  showNav: true,
  showSpinner: false,
  showSearchBtn: true,
  searchText: "",
  showBreadcrumb: false,
  breadcrumbItems: [],
};
export default function commonReducer(state = initialState, action) {
  //console.log("common.reducer  [state]", state, " [action] ", action);
  if (action.type == "TOGGLE_NAV") {
    const { payload } = action;
    return { ...state, showNav: payload };
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

  if (action.type == "TOGGLE_BREADCRUMB") {
    const { payload } = action;
    return { ...state, showBreadcrumb: payload };
  }

  if (action.type == "SET_BREADCRUMB") {
    const { payload } = action;
    return { ...state, breadcrumbItems: payload };
  }

  return state;
}
