import { useQuery } from "@tanstack/react-query";
import UserTable from "../components/UserTable";
import { getAllUsersQuery } from "../lib/hooks/user.hook";
import UserFilter from "../components/UserFilter";
import { Link, useLoaderData } from "react-router-dom";
import { SearchValuesType } from "../lib/types/response";
import PaginationTable from "../components/PaginationTable";
import { Button } from "../components/ui/button";
import { UserPlus } from "lucide-react";

export default function User() {
  const { searchValues } = useLoaderData() as SearchValuesType;
  console.log("search values", searchValues);
  const { data } = useQuery(getAllUsersQuery(searchValues));
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <UserFilter search={searchValues.search} />
        <Link to={"/dashboard/create-user"}>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add user
          </Button>
        </Link>
      </div>
      <UserTable users={data!.users} />
      <PaginationTable
        currentPage={data!.current_page}
        totalPages={data!.total_pages}
      />
    </div>
  );
}
