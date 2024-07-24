import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import { loginAction } from "./lib/hooks/auth.hook";
import Dashboard from "./pages/Dashboard";
import {
  createUserAction,
  deleteUser,
  editUser,
  getAllUsers,
  getUserById,
  getUserProfile,
} from "./lib/hooks/user.hook";
import User from "./pages/User";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";

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
      children: [
        {
          element: <User />,
          path: "user",
          loader: getAllUsers,
        },
        {
          path: "create-user",
          element: <CreateUser />,
          action: createUserAction,
        },
        {
          path: "edit-user/:id",
          element: <EditUser />,
          action: editUser,
          loader: getUserById,
        },
        {
          path: "delete-user/:id",
          action: deleteUser,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
