import { Link, useNavigate } from "react-router-dom";
import altaLogo from "../assets/logo.png";
import { UserType } from "../lib/types/user.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axiosInstance from "../lib/axiosInstance";
import { toast } from "./ui/use-toast";

type Props = {
  user: UserType;
};

export default function Topbar(props: Props) {
  const { user } = props;
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      toast({ title: "Logout successfull" });
      navigate("/");
    } catch (error: any) {
      toast({ title: error.response.data.message, variant: "destructive" });
    }
  };
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <Link to={"/dashboard"} className="flex ms-2 md:me-24">
              <img src={altaLogo} className="w-20 me-3" alt="FlowBite Logo" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Immersive dashboard
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3 gap-2">
              <p className="font-medium">Welcome back, {user.fullname}</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user.avatar} alt={user.avatar} />
                    <AvatarFallback>{user.fullname.charAt(0)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link to={"/dashboard/profile"}>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
