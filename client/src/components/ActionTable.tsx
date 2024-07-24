import { Edit, User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { PaginationEllipsis } from "./ui/pagination";
import DeleteUser from "./DeleteUser";
import { Link } from "react-router-dom";

type Props = {
  user_id: string;
};

export default function ActionTable(props: Props) {
  const { user_id } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <PaginationEllipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link to={`/dashboard/edit-user/${user_id}`}>
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DeleteUser user_id={user_id} />
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User2 className="mr-2 h-4 w-4" />
          View profile
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
