import { FC } from "react"
import { TerminalWindow } from "../components";

const Playground: FC = () => {
  return (
    <div className="container w-screen mx-auto">
      <TerminalWindow />

      <div>
        <h1 className="text-3xl font-bold mb-3 text-white">How to Use CloudShell</h1>

        <div className="space-y-6  rounded-lg">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-blue-400">1. Use the above terminal</h2>
            <p className="text-gray-300">
              The above terminal is connected to the VM you can use it.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-blue-400">2. Terminal Interface</h2>
            <p className="text-gray-300">
              Use linux commands to interact with the machine. If you don't know about linux just go and learn.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-blue-400">3. Properly stop the VM</h2>
            <p className="text-gray-300 inline-flex">
              Please stop the VM by typing the <h1 className="bg-gray-500 rounded px-1 mx-1"> exit </h1> command in the terminal interface.
            </p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Playground;
