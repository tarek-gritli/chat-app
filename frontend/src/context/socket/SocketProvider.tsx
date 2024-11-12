import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "./SocketContext";

const SOCKET_ENDPOINT = import.meta.env.VITE_SOCKET_ENDPOINT;

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      const socketInstance = io(SOCKET_ENDPOINT, {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socketInstance);

      socketInstance.on("connect", () => {
        console.log("Connected to socket:", socketInstance.id);
      });

      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socketInstance.disconnect();
        setOnlineUsers([]);
      };
    } else if (socket) {
      socket.disconnect();
      setOnlineUsers([]);
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
