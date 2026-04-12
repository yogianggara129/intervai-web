import { RouterProvider } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import { router } from "./router"

export function App() {
  return <RouterProvider router={router} />
}

export default App
