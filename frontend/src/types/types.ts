import { Socket } from "socket.io-client";

export interface SignupData {
  fullName: string;
  username: string;
  password: string;
  confirmedPassword: string;
  gender: string;
}

export interface User {
  _id: string;
  fullName: string;
  username: string;
  gender: string;
  profilePicture: string;
}

export interface AuthContextType {
  authUser: User | null;
  setAuthUser: (user: User | null, token: string | null) => void;
  token: string | null;
  logout: () => void;
}

export interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
}

export interface Message {
  _id: number;
  message: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  shouldShake?: boolean;
}

export interface ConversationStore {
  selectedConversation: User | null;
  setSelectedConversation: (selectedConversation: User | null) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}
