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
