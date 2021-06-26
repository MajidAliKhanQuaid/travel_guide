const initialState = { items: [], categories: [] };
export default function galleryReducer(state = initialState, action) {
  //console.log("gallery.reducer  [state]", state, " [action] ", action);
  if (action.type == "UPDATE_GALLERY") {
    const { payload } = action;
    return { ...state, gallery: payload };
  }
  return state;
}
