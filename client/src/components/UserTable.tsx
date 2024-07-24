import { UserType } from "../lib/types/user.type";
import ActionTable from "./ActionTable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface Props {
  users: UserType[];
}

export default function UserTable(props: Props) {
  const { users } = props;
  return (
    <Table className="border rounded-lg">
      <TableHeader>
        <TableRow>
          <TableHead>Created at</TableHead>
          <TableHead>Fullname</TableHead>
          <TableHead>Team</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          const createdAt = new Date(user.createdAt);
          return (
            <TableRow key={user._id}>
              <TableCell>
                {createdAt.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>{user.fullname}</TableCell>
              <TableCell>{user.team}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell>
                <ActionTable user_id={user._id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
