import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import { loginAction } from "./lib/hooks/auth.hook";
import Dashboard from "./pages/Dashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      action: loginAction,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
