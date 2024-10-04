import { FC } from "react"
import { Cloud, Server, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"

const Working: FC = () => {
  return (
    <>
      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Cloud, title: "Choose Your OS", description: "Select from a variety of operating systems" },
            { icon: Server, title: "Instant Setup", description: "Your virtual environment is ready in seconds" },
            { icon: Code, title: "Start Coding", description: "Access your OS through our online terminal" }
          ].map((step, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-lg">
              <step.icon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-900 p-8 rounded-lg mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Experience the Power of CloudShell</h2>
        <div className="bg-black p-4 rounded-lg overflow-hidden">
          <pre className="text-green-500 font-mono text-sm">
            <code>
              {`$ cloudshell init ubuntu-20.04
Initializing Ubuntu 20.04 environment...
Virtual OS ready! Type 'help' for available commands.

ubuntu@cloudshell:~$ ls
Documents  Downloads  Pictures  Public

ubuntu@cloudshell:~$ python3 --version
Python 3.8.5

ubuntu@cloudshell:~$ _`}
            </code>
          </pre>
        </div>
      </section>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl mb-8 text-gray-400">
          Join thousands of developers who trust CloudShell for their virtual OS needs.
        </p>
        <form className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="max-w-sm bg-gray-800 text-white border-gray-700"
          />
          <Link to="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
              Sign Up for Free
            </Button>
          </Link>
        </form>
      </section>
    </>
  )
}

export default Working;
