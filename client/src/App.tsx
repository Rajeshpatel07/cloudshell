import { FC } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";


const App: FC = () => {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App;
