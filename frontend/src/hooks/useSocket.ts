import { SocketContext } from "@/context/socket/SocketContext";
import { SocketContextType } from "@/types/types";
import { useContext } from "react";

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === null) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
