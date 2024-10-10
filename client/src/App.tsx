import { FC, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";


const App: FC = () => {

  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("app component")
    if (document.cookie) {
      setUser(true);
      return;
    }

    const request = async () => {
      try {
        const response = await axios.get("api/v1/home");
        if (response.status == 200) {
          setUser(true);
          navigate('dashboard')
        }
      } catch (err) {
        console.log(err);
      }
    }
    request();
  }, [])

  return (
    <>
      {user ?
        <h1 className="text-white font-medium text-xl text-center">User login</h1>
        :
        <h1 className="text-white font-medium text-xl text-center">User logout</h1>
      }
      <Outlet />

    </>
  )
}

export default App;
