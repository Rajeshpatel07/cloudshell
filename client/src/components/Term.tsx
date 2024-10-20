import { FC, useEffect, useState } from 'react'
import { Xterm } from 'xterm-react'
import { Terminal as XTermInstance } from 'xterm';
import { FitAddon } from 'xterm-addon-fit'
import { Button } from "@/components/ui/button"
import useSocket from '@/context/Socket'
import 'xterm/css/xterm.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TerminalWindow: FC = () => {
  const [terminal, setTerminal] = useState<XTermInstance | null>(null);
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
    }

    if (socket) {
      socket.addEventListener("message", socketHandler);
    }
    return () => {
      removeEventListener("message", socketHandler);
    }

  }, [terminal, socket])

  const handleStop = async () => {
    try {
      const id = JSON.parse(localStorage.getItem("containerId") || "");
      const request = await axios.delete(`/api/v1/stop/${id}`)
      console.log(request)
    } catch (err) {
      console.log(err)
    }
  }

  const handlePrune = async () => {
    try {
      const id = JSON.parse(localStorage.getItem("containerId") || "");
      const request = await axios.delete(`/api/v1/prune/${id}`)
      console.log(request)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-6 flex flex-col">
        <div className=" flex flex-col  border-2 border-gray-800 rounded-md">
          <div className="bg-gray-900 rounded-t-lg p-2  flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-md text-gray-400">CloudShell Terminal</span>
          </div>
          <Xterm
            className='overflow-x-auto'
            onInit={onTermInit}
            onDispose={onTermDispose}
            onData={handleData}
          />
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <Button variant="outline"
            onClick={handleStop}
            className="bg-gray-800 text-white hover:bg-gray-700">
            Stop Container
          </Button>
          <Button variant="outline"
            onClick={handlePrune}
            className="bg-gray-800 text-white hover:bg-gray-700">
            Delete Container
          </Button>
        </div>
      </main>
    </div>
  )
}

export default TerminalWindow
