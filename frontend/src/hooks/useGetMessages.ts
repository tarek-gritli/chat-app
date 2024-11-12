import useConversation from "@/zustand/useConversation";
import axios, { AxiosError, isAxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { token } = useAuth();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id || !token) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/messages/${selectedConversation._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { messages } = response.data;
        setMessages(messages);
      } catch (error) {
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation, setMessages, token]);

  return { messages, loading };
};
export default useGetMessages;

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
