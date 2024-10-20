import { FC, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Config } from "@/components"


const Demo: FC = () => {
  const [name, setName] = useState<string>("")
  const [selectedOS, setSelectedOS] = useState<string | null>(null)
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim().length > 0 && selectedOS !== null) {
      try {
        const request = await axios.post("/api/v1/trydemo", {
          name,
          os: selectedOS,
          type: "demo"
        })
        console.log(request);
        if (request.data) {
          localStorage.setItem("containerId", JSON.stringify(request?.data.containerId));
          navigate(`/play/${request.data.contianerId}`);
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      if (name.trim().length <= 1) {
        setError("enter a valid name");
      } else {
        setError("Select the image of the Operating System");
      }
    }
  }

  return (
    <Config
      name={name}
      selectedOS={selectedOS}
      error={error}
      setName={setName}
      setSelectedOS={setSelectedOS}
      handleSubmit={handleSubmit}
      renderType="page"
    />
  )
}

export default Demo;
