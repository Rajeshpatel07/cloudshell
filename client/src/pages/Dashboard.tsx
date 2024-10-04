import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import SideBar from "@/components/SideBar"
import { Table } from "@/components"

// Mock data for the table
const initialItems = [
  { id: "i23329f2j392nf2fj230..", name: "Ubuntu Server", time: "10:30 AM", status: "Running" },
  { id: "i23329f2j392nf2fj230..", name: "Debian VM", time: "11:45 AM", status: "Stopped" },
  { id: "i23329f2j392nf2fj230..", name: "Fedora Workstation", time: "09:15 AM", status: "Running" },
  { id: "i23329f2j392nf2fj230..", name: "CentOS Server", time: "02:00 PM", status: "Paused" },
  { id: "i23329f2j392nf2fj230..", name: "Arch Linux", time: "03:30 PM", status: "Running" },
]



const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [items, setItems] = useState(initialItems)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value
    setSearchTerm(term)
    const filteredItems = initialItems.filter(item =>
      Object.values(item).some(value =>
        value.toLowerCase().includes(term.toLowerCase())
      )
    )
    setItems(filteredItems)
  }

  return (
    <div className="min-h-screen bg-black text-white flex w-full">
      <SideBar />

      <main className="flex-1 py-8 px-3 md:px-8 overflow-x-scroll">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 w-full bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>

        {/* Table */}
        <div className="border-2 rounded-lg overflow-x-auto ">
          <Table items={items} />
        </div>
      </main>
    </div>
  )
}

export default Dashboard;
