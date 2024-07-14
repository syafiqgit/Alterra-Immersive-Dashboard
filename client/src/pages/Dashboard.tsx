import { useQuery } from "@tanstack/react-query";
import { userQuery } from "../lib/hooks/user.hook";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const { data: user } = useQuery(userQuery);
  return (
    <div>
      <Topbar user={user!} />
      <Sidebar />
      <div className="p-4 sm:ml-64"></div>
    </div>
  );
}
