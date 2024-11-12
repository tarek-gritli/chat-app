import { SignupData } from "@/types/types";
import axios, { AxiosError, isAxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuth();

  const signup = async ({
    fullName,
    username,
    password,
    confirmedPassword,
    gender,
  }: SignupData) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmedPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, {
        fullName,
        username,
        password,
        confirmedPassword,
        gender,
      });

      const { message, token, user } = response.data;
      setAuthUser(user, token);
      toast.success(message || "Signup successful");
    } catch (error) {
      handleSignupError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmedPassword,
  gender,
}: SignupData) {
  if (!fullName || !username || !password || !confirmedPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmedPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}

function handleSignupError(error: unknown) {
  let errorMessage = "An error occurred";

  if (isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      switch (axiosError.response.status) {
        case 400:
          errorMessage = "Passwords do not match";
          break;
        case 409:
          errorMessage = "User with this username already exists";
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
