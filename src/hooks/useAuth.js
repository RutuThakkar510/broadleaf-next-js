// hooks/useAuth.js
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
  const useAuthContext = useContext(AuthContext);
  return useAuthContext;
};
