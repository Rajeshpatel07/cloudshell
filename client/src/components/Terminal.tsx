import React, { useEffect, useState } from 'react';
import { Xterm } from 'xterm-react';
import { Terminal as XTermInstance } from 'xterm';

const socket = new WebSocket(import.meta.env.VITE_SOCKETURI)

const Terminal: React.FC = () => {
  const [terminal, setTerminal] = useState<XTermInstance | null>(null);
  const [command, setCommand] = useState<string>('');


  const onTermInit = (term: XTermInstance) => {
    setTerminal(term);
    term.reset();
    socket.send(JSON.stringify({
      event: "command",
      command: "uname",
      containerId: JSON.parse(localStorage.getItem("containerId") || "")

    }))
  }


  const onTermDispose = () => {
    setTerminal(null);
  };

  const handleData = (data: string) => {
    if (terminal) {
      const code = data.charCodeAt(0);
      if (code === 13 && command.length > 0) {
        if (socket) {
          socket.send(JSON.stringify({
            event: "command",
            command,
            containerId: JSON.parse(localStorage.getItem("containerId") || "")
          }))
        }
        setCommand('');
      }
      else if (code < 32 || code === 127) {
        setCommand(command.slice(0, -1));
        terminal.write("\b \b");
        return;
      }
      else {
        terminal.write(data);
        setCommand((prev) => prev + data);
      }
    }
  };

  useEffect(() => {
    const socketHandler = (event: MessageEvent): void => {
      const message = JSON.parse(event.data);
      if (message.event === "buffer") {
        terminal?.write(message.buffer);
      }
    }

    if (socket) {
      socket.addEventListener("message", socketHandler);
    }
    return () => {
      removeEventListener("message", socketHandler);
    }

  }, [socket, terminal])

  return (
    <div className="App">
      <header className="App-header">
        <Xterm
          onInit={onTermInit}
          onDispose={onTermDispose}
          onData={handleData}
        />
      </header>
    </div>
  );
};

export default Terminal;
