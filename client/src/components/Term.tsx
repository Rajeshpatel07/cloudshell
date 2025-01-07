import { FC, useEffect, useState } from 'react'
import { Xterm } from 'xterm-react'
import { Terminal as XTermInstance } from 'xterm';
import { FitAddon } from 'xterm-addon-fit'
import useSocket from '@/context/Socket'
import 'xterm/css/xterm.css'
import { useParams } from 'react-router-dom';
import { DisplayError } from './ui/error';

const TerminalWindow: FC = () => {
  const [terminal, setTerminal] = useState<XTermInstance | null>(null);
  const [error, setError] = useState('');
  const { socket } = useSocket();

  const params = useParams();

  const onTermInit = (term: XTermInstance) => {
    setTerminal(term);
    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    term.reset();

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        event: "command",
        command: "uname\r",
        containerId: params.id
      }))
    }
  }

  const onTermDispose = () => {
    setTerminal(null);
  };

  const handleData = (data: string) => {
    if (terminal) {
      socket.send(JSON.stringify({
        event: "command",
        command: data,
        containerId: params.id
      }))
    }
  };

  useEffect(() => {
    const screen: HTMLDivElement | null = document.querySelector("#root > div > div > header > div > div > div.xterm-screen")

    if (screen) {
      screen.removeAttribute("style");
    }
    const socketHandler = (event: MessageEvent): void => {
      const message = JSON.parse(event.data);
      if (message.event === "buffer") {
        terminal?.write(message.buffer);
      }
      else if (message.event === "error") {
        setError(message.msg);
      }
    }

    if (socket) {
      socket.addEventListener("message", socketHandler);
    }
    return () => {
      removeEventListener("message", socketHandler);
    }

  }, [terminal, socket])

  return (
    <div className="bg-black text-white flex flex-col">
      {
        error.length > 0 ?
          <DisplayError
            title="Container Not Found"
            desc="Is the Container running check it out in dashboard"
            link="/dashboard"
            buttonText='Go to Dashboard'
          />
          :
          <main className="container mx-auto px-4 py-6 flex flex-col">
            <div className="border-2 border-gray-800 rounded-md h-9/12">
              <div className="bg-gray-900 rounded-t-lg p-2 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-md text-gray-400">CloudShell Terminal</span>
              </div>
              <Xterm
                id="terminal"
                className='overflow-x-auto'
                onInit={onTermInit}
                onDispose={onTermDispose}
                onData={handleData}
              />
            </div>
          </main>
      }
    </div>


  )
}

export default TerminalWindow
