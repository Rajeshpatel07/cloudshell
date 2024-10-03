import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import SideBar from "@/components/SideBar"
import { Table } from "@/components"

// Mock data for the table
const initialItems = [
  { id: "001", name: "Ubuntu Server", time: "10:30 AM", status: "Running" },
  { id: "002", name: "Debian VM", time: "11:45 AM", status: "Stopped" },
  { id: "003", name: "Fedora Workstation", time: "09:15 AM", status: "Running" },
  { id: "004", name: "CentOS Server", time: "02:00 PM", status: "Paused" },
  { id: "005", name: "Arch Linux", time: "03:30 PM", status: "Running" },
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
      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Search bar */}
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
        <div className="bg-gray-900 rounded-lg overflow-x-auto">
          <Table items={items} />
        </div>
      </main>
    </div>
  )
}

export default Dashboard;
