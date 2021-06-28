import store from "./../store";
import categoryService from "../../services/categoryservice";

const initialState = {
  showNav: true,
  showSpinner: false,
  toggleSearchBtn: true,
  searchText: "",
  toggleBreadcrumb: false,
  breadcrumbItems: [],
  categories: [],
};

categoryService
  .getCategories()
  .then((categories) => {
    store.dispatch({
      type: "SET_CATEGORIES",
      payload: categories,
    });
  })
  .catch((err) => {});

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
    return { ...state, toggleSearchBtn: payload };
  }

  if (action.type == "CHANGE_SEARCH_CATEGORY") {
    const { payload } = action;
    return { ...state, searchCategory: payload };
  }

  if (action.type == "TOGGLE_BREADCRUMB") {
    const { payload } = action;
    return { ...state, toggleBreadcrumb: payload };
  }

  if (action.type == "SET_BREADCRUMB") {
    const { payload } = action;
    return { ...state, breadcrumbItems: payload };
  }

  if (action.type == "SET_CATEGORIES") {
    const { payload } = action;
    return { ...state, categories: payload };
  }

  return state;
}
