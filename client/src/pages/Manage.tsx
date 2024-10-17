import { FC, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader, Power, RefreshCw, Terminal } from "lucide-react"
import { Title } from "@/components/ui/title"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

// Sample data for the instance configuration
interface osConfig {
  id: string;
  name: string;
  image: string;
  status: string;
  createdAt: string;
}

//setInstanceConfig(prevConfig => ({
//      ...prevConfig,
//      status: action === 'stop' ? 'Stopped' : 'Running',
//      launchTime: action !== 'stop' ? new Date().toISOString().replace('T', ' ').substring(0, 19) : prevConfig.createdAt
//    }))

const Manage: FC = () => {
  const [config, setConfig] = useState<osConfig | null>(null);

  const params = useParams();


  useEffect(() => {
    const getContainerInfo = async () => {
      try {
        const response = await axios.get(`/api/v1/c/info/${params.id}`);
        console.log(response);
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
      const response = await axios.put(`/api/v1/c/${url}`, {
        id: params.id
      });
      console.log(response);
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
      console.log(response);
      if (response.status === 200) {
        setConfig(prev => prev ? { ...prev, status: "running" } : null);
      }
    } catch (err) {
      console.log(err);
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
                <Button
                  variant="outline"
                  className={'text-red-500 hover:text-red-400'}
                  onClick={handleAction}
                >
                  <Power className="h-4 w-4 mr-2" />
                  Stop
                </Button>
              }
              <Button
                variant="outline"
                className="text-yellow-400 hover:text-yellow-300"
                onClick={handleRestart}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Restart
              </Button>
              <Link to={`/play/${params.id}`}>
                <Button
                  variant="outline"
                  className="text-blue-500 hover:text-blue-300"
                >
                  <Terminal className="h-4 w-4 mr-2" />
                  Open
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Instance Details</h2>
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
