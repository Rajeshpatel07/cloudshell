import { FC } from "react";
import { Outlet } from "react-router-dom";


const App: FC = () => {
  console.log('app component')

  return (
    <>
      <Outlet />
    </>
  )
}

export default App;
