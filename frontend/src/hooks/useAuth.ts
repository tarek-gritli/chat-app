import { AuthContext } from "@/context/auth/AuthContext";
import { AuthContextType } from "@/types/types";
import { useContext } from "react";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
