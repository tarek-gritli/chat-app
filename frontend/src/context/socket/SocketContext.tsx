import { SocketContextType } from "@/types/types";
import { createContext } from "react";

export const SocketContext = createContext<SocketContextType | null>(null);
