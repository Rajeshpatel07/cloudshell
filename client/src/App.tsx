import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";


const App: FC = () => {

  const navigate = useNavigate();

  useEffect(() => {
    console.log("app component")
    if (document.cookie) {
      return;
    }

    const request = async () => {
      try {
        const response = await axios.get("api/v1/home");
        if (response.status == 200) {
          //navigate('dashboard')
        }
      } catch (err) {
        console.log(err);
      }
    }
    request();
  }, [navigate])

  return (
    <>
      <Outlet />
    </>
  )
}

export default App;
