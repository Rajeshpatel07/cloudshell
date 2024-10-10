import { FC, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { os } from "@/data/OsImages"
import { LogoCards } from "@/components/ui/Cards"

interface configProps {
  name: string;
  selectedOS: string | null;
  error: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setSelectedOS: React.Dispatch<React.SetStateAction<string | null>>;
  handleSubmit: (e: FormEvent) => void;
  renderType: string;
}

const Config: FC<configProps> = ({
  name,
  selectedOS,
  error,
  setName,
  setSelectedOS,
  handleSubmit,
  renderType
}) => {
  return (
    <div className={`  text-white ${renderType === "page" && "min-h-screen"}`}>

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
          </div>

          <p className="text-red-500 mb-6 font-serif text-xl font-medium">{error}</p>
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

export default Config;
