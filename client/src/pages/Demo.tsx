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
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/trydemo`, {
          name,
          os: selectedOS,
          type: "demo"
        }, { withCredentials: true })
        if (response.status === 201) {
          navigate(`/play/${response.data.containerId}`);
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
