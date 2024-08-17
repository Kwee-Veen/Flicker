import React, { useState, createContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContextInterface, AuthToken } from "../types/interfaces";

export const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthContextProvider:React.FC<React.PropsWithChildren> = (props) => {
  const [token, setToken] = useState<AuthToken|null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const authenticate = async (token: AuthToken) => {
    setToken(token);
    const origin = location.state?.intent?.pathname || "/";
    navigate(origin);
  };
  
  const signout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        authenticate,
        signout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
