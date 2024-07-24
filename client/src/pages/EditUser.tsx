import { Link, useLoaderData, useSubmit } from "react-router-dom";
import InputForm from "../components/InputForm";
import SelectInput from "../components/SelectInput";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { TeamType, StatusType, RoleType } from "../lib/constant";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { getOneUserQuery } from "../lib/hooks/user.hook";
import { Form } from "../components/ui/form";
import { EditUserSchema } from "../lib/validation/user.validation";

export default function EditUser() {
  const id = useLoaderData() as string;
  const { data } = useQuery(getOneUserQuery(id));
  const submit = useSubmit();
  const form = useForm<z.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      fullname: data?.fullname,
      email: data?.email,
      phone_number: data?.phone_number as unknown as number,
      address: data?.address,
      status: data?.status,
      team: data?.team,
      role: data?.role,
    },
  });
  const handleSubmit = (values: z.infer<typeof EditUserSchema>) => {
    submit(values, { method: "PATCH" });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit user</CardTitle>
        <CardDescription>
          Please fill in the form below to edit user
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <InputForm
              label="Fullname"
              name="fullname"
              placeholder="Enter fullname"
              type="text"
              control={form.control}
            />
            <InputForm
              label="Email"
              name="email"
              placeholder="Enter fullname"
              type="text"
              control={form.control}
            />
            <InputForm
              label="Address"
              name="address"
              placeholder="Enter Address"
              type="text"
              control={form.control}
            />{" "}
            <InputForm
              label="Phone number"
              name="phone_number"
              placeholder="Enter password"
              type="number"
              control={form.control}
            />
            <SelectInput
              name="team"
              control={form.control}
              label="Team"
              placeholder="Select team"
              options={Object.values(TeamType)}
            />
            <SelectInput
              name="status"
              control={form.control}
              label="Status"
              placeholder="Select team"
              options={Object.values(StatusType)}
            />
            <SelectInput
              name="role"
              control={form.control}
              label="Role"
              placeholder="Select team"
              options={Object.values(RoleType)}
            />
            <div className="flex items-center mt-4 gap-2">
              <Link to={"/dashboard/user"}>
                <Button variant={"destructive"}>Cancel</Button>
              </Link>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
