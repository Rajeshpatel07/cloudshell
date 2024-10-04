import { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { FormInput } from "@/components/ui/input"

const Login: FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt with:", { email, password })
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md px-3">
          <h1 className="text-3xl font-bold mb-6 text-center">Login to CloudShell</h1>
          <form onSubmit={handleSubmit} className="space-y-6">

            <FormInput
              label="email"
              id="email"
              type="email"
              value={email}
              setState={setEmail}
              placeholder="Enter your email"
            />
            <FormInput
              label="password"
              id="password"
              type="password"
              value={password}
              setState={setPassword}
              placeholder="Enter your password"
            />
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-lg"
            >
              Log In
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

export default Login; 