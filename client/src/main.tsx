import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Dashboard, Demo, Home, Login, Manage, NotFound, Playground, Signup } from './pages'
import { SocketProvider } from './context/Socket.tsx'
import { PageLoader } from './components/ui/Loaders.tsx'

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
    route: "play/:id",
    element: <Playground />
  },
  {
    route: "trydemo",
    element: <Demo />
  },
  {
    route: "dashboard",
    element: <Dashboard />
  },
  {
    route: "signup",
    element: <Signup />
  },
  {
    route: "manage/:id",
    element: <Manage />
  }
]

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {
        routes.map((route, idx) => (
          <Route path={route.route} key={idx} element={
            <Suspense fallback={<PageLoader />} >
              {route.element}
            </Suspense>
          } />
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
