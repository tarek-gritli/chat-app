import { Message } from "@/types/types";
import useConversation from "@/zustand/useConversation";
import { useEffect } from "react";
import { useSocket } from "./useSocket";
import newMessageSound from "@/assets/new-message.mp3";

const useListenMessages = () => {
  const { socket } = useSocket();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage: Message) => {
      newMessage.shouldShake = true;
      setMessages([...messages, newMessage]);
      const audio = new Audio(newMessageSound);
      audio.play();
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
