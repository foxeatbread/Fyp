import React, { createContext, useReducer, useContext } from "react";

// Define initial state
const initialState = {
  isAuthenticated: false,
  userInfo: null,
};

// Create context
const UserContext = createContext(initialState);

// Define action types
const ActionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SET_USER_INFO: "SET_USER_INFO",
};

// Reducer function to handle state changes
const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        userInfo: action.payload,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        userInfo: null,
      };
    case ActionTypes.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

// Create a provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Actions
  const login = (userInfo) => {
    dispatch({ type: ActionTypes.LOGIN, payload: userInfo });
  };

  const logout = () => {
    dispatch({ type: ActionTypes.LOGOUT });
  };

  const setUserInfo = (userInfo) => {
    dispatch({ type: ActionTypes.SET_USER_INFO, payload: userInfo });
  };

  return (
    <UserContext.Provider value={{ ...state, login, logout, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use context
export const useUserContext = () => useContext(UserContext);

export default UserContext;
