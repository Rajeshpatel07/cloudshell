import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Config } from ".";

const ConfigDialog = () => {

  const [name, setName] = useState<string>("")
  const [selectedOS, setSelectedOS] = useState<string | null>(null)
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim().length > 0 && selectedOS !== null) {
      try {
        const request = await axios.post("/api/v1/c/create", {
          name,
          os: selectedOS,
          userId: JSON.parse(localStorage.getItem("userId") || "")
        })
        console.log(request);
        if (request.data) {
          localStorage.setItem("containerId", JSON.stringify(request?.data.containerId));
          navigate("/playground");
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
      renderType="dialog"
    />
  )

}

export default ConfigDialog;
