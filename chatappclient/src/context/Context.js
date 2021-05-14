import { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(window.sessionStorage.getItem("user")) || null,
  loading: false,
  error: false,
  room: window.sessionStorage.getItem("room") || "General",
};

export const Context = createContext(INITIAL_STATE);
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  return (
    <Context.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        room: state.room,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
