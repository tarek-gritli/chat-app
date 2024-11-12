import axios, { AxiosError, isAxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();

  const login = async (username: string, password: string) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });
      const { message, user, token } = response.data;
      setAuthUser(user, token);
      toast.success(message || "Login Successful");
    } catch (error) {
      handleLoginError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(username: string, password: string) {
  if (!username || !password) {
    toast.error("Please fill all fields");
    return false;
  }
  return true;
}

function handleLoginError(error: unknown) {
  let errorMessage = "An error occurred";

  if (isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      switch (axiosError.response.status) {
        case 400:
          errorMessage = "Invalid username or password";
          break;
        case 500:
          errorMessage = "Server error. Please try again later";
          break;
        default:
          errorMessage = "An error occurred";
      }
    } else {
      errorMessage = axiosError.message || errorMessage;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  toast.error(errorMessage);
}
