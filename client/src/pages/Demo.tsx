import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { os } from "@/data/OsImages"
import { LogoCards } from "@/components/ui/Cards"
import axios, { AxiosError, AxiosResponse, AxiosResponseTransformer } from "axios"
import { useNavigate } from "react-router-dom"


const Demo = () => {
  const [name, setName] = useState<string>("")
  const [selectedOS, setSelectedOS] = useState<string | null>(null)
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim().length > 0 && selectedOS !== null) {
      try {
        const request = await axios.post("/api/v1/create", {
          name,
          os: selectedOS
        })
        console.log(request);
        if (request.data) {
          localStorage.setItem("containerId", JSON.stringify(request?.data.containerId));
          navigate("/playground");
        }
      } catch (err) {
        console.log(err)
        setError(err.response.data.err.json.message);
      }
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Create Your Virtual Environment</h1>

        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Label htmlFor="name" className="block mb-2 text-lg">
              Your Name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-900 border-gray-700 text-white"
              placeholder="Enter your name"
              required
            />
            <p className="text-red-500 font-medium">{error}</p>
          </div>

          <div className="mb-6">
            <Label className="block mb-2 text-lg">
              Choose Your Operating System
            </Label>
            <LogoCards operatingSystems={os}
              selectedOS={selectedOS}
              setSelectedOS={setSelectedOS}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-lg"
            onClick={handleSubmit}
          >
            Create Environment
          </Button>
        </div>
      </main>
    </div>
  )
}

export default Demo;
