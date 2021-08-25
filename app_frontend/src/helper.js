export const toggleNav = (_dispatch, _toggle) => {
  _dispatch({
    type: "TOGGLE_NAV",
    payload: _toggle,
  });
};

export const toggleSpinner = (_dispatch, _toggle) => {
  _dispatch({
    type: "TOGGLE_SPINNER",
    payload: _toggle,
  });
};

export const toggleSearchButton = (_dispatch, _toggle) => {
  _dispatch({
    type: "TOGGLE_SEARCH_BTN",
    payload: _toggle,
  });
};

export const toggleBreadcrumb = (_dispatch, _toggle) => {
  _dispatch({
    type: "TOGGLE_BREADCRUMB",
    payload: _toggle,
  });
};

export const addBreadcrumbItems = (_dispatch, _toggle) => {
  _dispatch({
    type: "SET_BREADCRUMB",
    payload: _toggle,
  });
};

export const addCategories = (_dispatch, _categories) => {
  _dispatch({
    type: "SET_CATEGORIES",
    payload: _categories,
  });
};

export const updateLocation = (_dispatch, _location) => {
  _dispatch({
    type: "UPDATE_LOCATION",
    payload: _location,
  });
};
