import { User } from "@/types/types";
import axios, { AxiosError, isAxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<User[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setConversations(data);
      } catch (error) {
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, [token]);

  return { loading, conversations };
};

export default useGetConversations;

function handleFetchError(error: unknown) {
  let errorMessage = "An error occurred";

  if (isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      switch (axiosError.response.status) {
        case 401:
          errorMessage = "Unauthorized. Please log in again.";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          break;
        default:
          errorMessage = "An unexpected error occurred";
      }
    } else {
      errorMessage = axiosError.message || errorMessage;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  toast.error(errorMessage);
}
