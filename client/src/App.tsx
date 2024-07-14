import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import { loginAction } from "./lib/hooks/auth.hook";
import Dashboard from "./pages/Dashboard";
import { getUserProfile } from "./lib/hooks/user.hook";

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
      loader: getUserProfile,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
