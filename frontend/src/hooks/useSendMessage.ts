import useConversation from "@/zustand/useConversation";
import axios, { AxiosError, isAxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";
import sendMessageSound from "@/assets/send-message.mp3";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { token } = useAuth();

  const sendMessage = async (message: string) => {
    if (!selectedConversation) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/messages/send/${selectedConversation._id}`,
        {
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { newMessage } = response.data;
      setMessages([...messages, newMessage]);
      const audio = new Audio(sendMessageSound);
      audio.play();
    } catch (error) {
      handleSendMessageError(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;

function handleSendMessageError(error: unknown) {
  let errorMessage = "An error occurred";

  if (isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      switch (axiosError.response?.status) {
        case 401:
          errorMessage = "Unauthorized. Please log in again.";
          break;
        case 500:
          errorMessage = "Server error. Please try again later.";
          break;
        default:
          errorMessage = "An unexpected error occurred.";
      }
    } else {
      errorMessage = axiosError.message || errorMessage;
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  toast.error(errorMessage);
}
