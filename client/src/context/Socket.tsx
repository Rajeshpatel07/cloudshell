import { ReactNode, FC, useContext, createContext, useRef } from "react";

interface ContextInterface {
  socket: WebSocket;
}

const SocketContext = createContext<ContextInterface>({} as ContextInterface);

export const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const socketRef = useRef(new WebSocket(import.meta.env.VITE_SOCKETURI));

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};

const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export default useSocket;

