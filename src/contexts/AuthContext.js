import React, { createContext, useReducer } from "react";

const initialValue = {
  isAuthenticated: false,
  user: null,
};

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialValue });

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const login = async (username, callback) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: username },
    });
    callback();
  };

  const logout = (callback) => {
    dispatch({
      type: LOGOUT,
    });
    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
