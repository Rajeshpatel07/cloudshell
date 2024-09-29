import { useRef, useState } from "react"
import { Terminal } from "./components"

const App = () => {

  const [show, setShow] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleCreate = async () => {

    const request = await fetch(`/api/v1/create`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        name: inputRef.current?.value,
        os: "ubuntu:22.04"
      })
    })

    const response = await request.json();
    console.log(response.status);
    if (response) {
      setShow(true);
      localStorage.setItem("containerId", JSON.stringify(response.containerId));
    }
  }


  const handleStop = async () => {
    const request = await fetch(`/api/v1/prune`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        id: JSON.parse(localStorage.getItem("containerId") || "")
      })
    })

    const response = await request.json();
    console.log(response);

  }

  return (
    <div>
      {show &&
        <Terminal />
      }
      <section className="flex justify-center items-center gap-5 h-20">
        <div>
          <label htmlFor="name" className="block text-xl font-medium text-gray-700"> Email </label>

          <input
            type="text"
            id="name"
            ref={inputRef}
            placeholder="enter Container name"
            className="mt-1 w-full border-black text-black"
          />
        </div>

        {!show &&
          <button className="px-4 py-1 rounded bg-blue-500" onClick={handleCreate}>Create</button>
        }
        <button className="px-4 py-1 rounded bg-red-500" onClick={handleStop}>Stop</button>
      </section>
    </div>
  )
}

export default App
