import { FC, useState } from "react";
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { FormInput } from "../components/ui/input"
import axios from "axios";

const Signup: FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [name, setName] = useState<string>("")

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const request = await axios.post("/api/v1/signup", { name, email, password });
      console.log(request);
      if (request.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md px-3">
          <h1 className="text-3xl font-bold mb-6 text-center">Signup to CloudShell</h1>
          <form onSubmit={handleSubmit} className="space-y-6">

            <FormInput
              label="name"
              id="name"
              type="text"
              value={name}
              setState={setName}
              placeholder="Enter your name"
            />

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
              Signup
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-400">
            Already have an account?
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  )

}

export default Signup;
