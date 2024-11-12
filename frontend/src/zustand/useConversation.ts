import { create } from "zustand";
import { ConversationStore, User } from "@/types/types";

const useConversation = create<ConversationStore>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation: User | null) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (newMessages) => set({ messages: newMessages }),
}));

export default useConversation;
