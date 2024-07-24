import { Form, useSearchParams, useSubmit } from "react-router-dom";
import { RoleType, SortBy, StatusType, TeamType } from "../lib/constant";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type Props = {
  search: any;
};

export default function UserFilter(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { search } = props;
  const submit = useSubmit();
  const debounce = (func: (arg: any, name?: string) => void, delay: number) => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    return (arg: any, name?: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(arg, name);
      }, delay);
    };
  };

  const handleInputChange = debounce((form) => {
    searchParams.set("search", form);
    setSearchParams(searchParams);
    submit(searchParams);
  }, 1000);

  const handleSelectChange = debounce((value: any, name?: string) => {
    if (name) {
      searchParams.set(name, value);
      setSearchParams(searchParams);
      submit(searchParams);
    }
  }, 1000);

  return (
    <Form className="flex items-center gap-2 w-full">
      <Input
        type="search"
        name="search"
        defaultValue={search}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Search"
      />
      <Select
        name="team"
        onValueChange={(value) => handleSelectChange(value, "team")}
      >
        <SelectTrigger>
          <SelectValue placeholder="Team" />
        </SelectTrigger>
        <SelectContent>
          {["All", ...Object.values(TeamType)].map((value) => (
            <SelectItem value={value} key={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        name="status"
        onValueChange={(value) => handleSelectChange(value, "status")}
      >
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {["All", ...Object.values(StatusType)].map((value) => (
            <SelectItem value={value} key={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        name="role"
        onValueChange={(value) => handleSelectChange(value, "role")}
      >
        <SelectTrigger>
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          {["All", ...Object.values(RoleType)].map((value) => (
            <SelectItem value={value} key={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        name="sort"
        onValueChange={(value) => handleSelectChange(value, "sort")}
      >
        <SelectTrigger>
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          {["All", ...Object.values(SortBy)].map((value) => (
            <SelectItem value={value} key={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Form>
  );
}
