import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { Dashboard, Demo, Home, Login, NotFound, Playground } from './pages'
import { SocketProvider } from './context/Socket.tsx'


const routes = [
  {
    route: "",
    element: <Home />
  },
  {
    route: "/*",
    element: <NotFound />
  },
  {
    route: "login",
    element: <Login />
  },
  {
    route: "playground",
    element: <Playground />
  },
  {
    route: "trydemo",
    element: <Demo />
  },
  {
    route: "dashboard",
    element: <Dashboard />
  }
]

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {
        routes.map((route, idx) => (
          <Route path={route.route} element={route.element} key={idx} />
        ))
      }
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </StrictMode>,
)
