import { FC, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Delete, Loader, Power, RefreshCw, Terminal } from "lucide-react"
import { Title } from "@/components/ui/title"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { AlertDialog } from "@/components/ui/dialog"
//
//
// Sample data for the instance configuration
interface osConfig {
  id: string;
  name: string;
  image: string;
  status: string;
  createdAt: string;
}


const Manage: FC = () => {
  const [config, setConfig] = useState<osConfig | null>(null);

  const params = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const getContainerInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/c/info/${params.id}`);
        if (response.status == 200) {
          setConfig(response.data.info);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getContainerInfo();
  }, [params])

  const handleAction = async () => {
    const url = config && config.status === "running" ? "stop" : "restart"
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/c/${url}`, {
        id: params.id
      });
      if (response.status == 200) {
        setConfig(prev => prev ? { ...prev, status: "stopped" } : null);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleRestart = async () => {
    try {
      const response = await axios.put(`/api/v1/c/restart`, {
        id: params.id
      });
      if (response.status === 200) {
        setConfig(prev => prev ? { ...prev, status: "running" } : null);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handlePrune = async () => {
    try {
      const response = await axios.delete(`/api/v1/c/prune/${params.id}`)
      if (response.status === 200) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen  text-gray-100">
      {config === null && <Loader className="w-16 h-16" />}
      {config &&
        <main className="container mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Instance Configuration</h1>
            <div className="flex space-x-2">
              {config.status === "running" &&
                <AlertDialog
                  title="Are you Sure to stop this container ?"
                  handlePrune={handleAction}
                  description="It will be Stopped"
                  buttonTitle="Stop the Container"
                  buttonColor="text-red-500 hover:text-red-300"
                  triggername="Stop"
                >
                  <Power className="h-4 w-4 mr-2" />
                </AlertDialog>
              }
              <AlertDialog
                title="Are you Sure to restart this container ?"
                handlePrune={handleRestart}
                description="It will be Restarted"
                buttonTitle="Restart the Container"

                buttonColor="text-yellow-500 hover:text-yellow-300"
                triggername="Restart"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
              </AlertDialog>
              <AlertDialog
                title="Are you Sure to prune this container ?"
                handlePrune={handlePrune}
                description="It will be completely deleted"
                buttonTitle="Prune the Container"
                buttonColor="text-brown-500 hover:text-brown-300"
                triggername="prune"
              >
                <Delete className="h-4 w-4 mr-2" />
              </AlertDialog>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold mb-4">Instance Details</h2>
                {config.status === 'running' &&


                  <Link to={`/play/${params.id}`}>
                    <Button
                      variant="outline"
                      className="text-blue-500 hover:text-blue-300 "
                    >
                      <Terminal className="h-4 w-4 mr-2" />
                      Open
                    </Button>
                  </Link>
                }
              </div>
              <div className="space-y-2">
                <Title config={config} />
              </div>
            </div>
          </div>
        </main>
      }
    </div>
  )
}

export default Manage;
