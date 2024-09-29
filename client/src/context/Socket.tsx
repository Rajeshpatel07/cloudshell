import { ReactNode, FC, useContext, createContext, useState, useEffect, useRef } from "react";

interface ContextInterface {
  socket: WebSocket;
}

const SocketContext = createContext<ContextInterface | undefined>(undefined);

export const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  let socket;

  useEffect(() => {

    socket = new WebSocket(import.meta.env.VITE_SOCKETURI);
    socket.onopen = () => { console.log('WS open') }
    socket.onclose = () => { console.log('WS close') }

  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
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

