import { FC, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import SideBar from "@/components/SideBar"
import { ConfigDialog, Table } from "@/components"
import axios from "axios"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BorderButton } from "@/components/ui/button"
import { Alert } from "@/components/ui/alert"
import { useNavigate } from "react-router-dom"


const Dashboard: FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [items, setItems] = useState([])
  const [searchItems, setSearchItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filteredItems = items.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(term.toLowerCase())
      )
    );
    setSearchItems(filteredItems);
  };

  useEffect(() => {
    const fetchContainers = async () => {
      const userId = JSON.parse(localStorage.getItem("userId") || "");
      try {
        const response = await axios.get(`/api/v1/c/${userId}`);
        console.log(response);
        if (response.status === 200) {
          setItems(response.data.containers)
          setSearchItems(response.data.containers)
        }
      } catch (err) {
        console.log(err)
        setError(err.message);
      }
    }
    const request = async () => {
      try {
        const response = await axios.get("api/v1/home");
        if (response.status === 200) {
          fetchContainers();
        }
      } catch (err) {
        console.log(err);
        if (err.status === 403) {
          navigate('/');
        }
      }
    }
    request();
  }, [])

  const logout = async () => {
    try {
      const request = await axios.get(`/api/v1/logout`);
      if (request.status === 200) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {error.length > 0 && <Alert title={error} />}
      <div className="min-h-screen bg-black text-white flex w-full">
        <SideBar />

        <main className="flex-1 py-8 px-3 md:px-8 overflow-x-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold ">Dashboard</h1>
            <div className="flex items-center gap-2">
              <button
                className="border px-4 py-2 bg-red-500 rounded-lg font-semibold"
                onClick={logout}
              >Logout</button>
              <Dialog>
                <DialogTrigger>
                  <BorderButton title="create" />
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle></DialogTitle>
                  <ConfigDialog />
                </DialogContent>
              </Dialog>
            </div>
          </div>

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
            <Table items={searchItems} />
          </div>
        </main>
      </div>
    </>
  )
}

export default Dashboard;
