import { createContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client"; // Proper import for Socket and io

// Define the shape of your context
interface SocketContextType {
  socket: Socket | null;
}

// Create the context with a default value of `null`
const SocketContext = createContext<SocketContextType | null>(null);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8000"); // Adjust URL as needed
    setSocket(newSocket);

    newSocket.on("connect", () => {
      const token = localStorage.getItem("authToken");

      console.log("connected");

      newSocket.emit("updateStatus", { token });
    });

  

    newSocket.on("disconnect", () => {
      console.log("disconnected");
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
