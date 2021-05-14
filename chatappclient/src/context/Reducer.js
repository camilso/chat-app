import immer from "immer";
const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return immer(state, (draft) => {
        draft.loading = true;
      });
    case "LOGIN_SUCCESS":
      return immer(state, (draft) => {
        draft.user = action.payload;
        draft.loading = false;
      });
    case "LOGIN_FAILURE":
      return immer(state, (draft) => {
        draft.error = true;
      });
    case "JOIN_ROOM":
      return immer(state, (draft) => {
        draft.room = action.payload;
      });
    case "LOGOUT":
      return immer(state, (draft) => {
        draft.user = null;
      });
    default:
      return state;
  }
};

export default Reducer;
