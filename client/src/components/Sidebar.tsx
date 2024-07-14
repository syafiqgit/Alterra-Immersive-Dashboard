import { AreaChart, School, User, UserRoundPenIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <Link to={"/dashboard"}>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <AreaChart className="w-7 h-7 text-blue-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-white" />
              <span className="ms-2">Dashboard</span>
            </div>
          </Link>
          <Link to={"/dashboard/user"}>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <User className="w-7 h-7 text-blue-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-white" />
              <span className="ms-2">User</span>
            </div>
          </Link>
          <Link to={"/dashboard/mentee"}>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <UserRoundPenIcon className="w-7 h-7 text-blue-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-white" />
              <span className="ms-2">Mentee</span>
            </div>
          </Link>
          <Link to={"/dashboard/class"}>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <School className="w-7 h-7 text-blue-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-white" />
              <span className="ms-2">Class</span>
            </div>
          </Link>
        </ul>
      </div>
    </aside>
  );
}
