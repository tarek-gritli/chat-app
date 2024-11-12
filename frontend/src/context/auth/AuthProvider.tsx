import { AuthContextType, User } from "@/types/types";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("chat-user");
    if (storedUser) setAuthUser(JSON.parse(storedUser));
    const storedToken = localStorage.getItem("chat-token");
    if (storedToken) setToken(storedToken);
  }, []);

  const setAuth = (user: User | null, token: string | null) => {
    setAuthUser(user);
    setToken(token);
    if (user) {
      localStorage.setItem("chat-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("chat-user");
    }
    if (token) {
      localStorage.setItem("chat-token", token);
    } else {
      localStorage.removeItem("chat-token");
    }
  };

  const logout = () => {
    setAuth(null, null);
  };

  const value: AuthContextType = {
    authUser,
    setAuthUser: setAuth,
    token,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
