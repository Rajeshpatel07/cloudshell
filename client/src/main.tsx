import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { Demo, Home, Login, NotFound } from './pages'


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
    route: "trydemo",
    element: <Demo />
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
    <RouterProvider router={router} />
  </StrictMode>,
)
