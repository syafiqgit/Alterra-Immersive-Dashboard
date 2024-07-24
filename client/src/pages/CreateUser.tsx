import { Eye, EyeOff } from "lucide-react";
import { Form } from "../components/ui/form";
import InputForm from "../components/InputForm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useSubmit } from "react-router-dom";
import { useState } from "react";
import SelectInput from "../components/SelectInput";
import { RoleType, StatusType, TeamType } from "../lib/constant";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { UserSchema } from "../lib/validation/user.validation";

export default function CreateUser() {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const submit = useSubmit();
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      phone_number: 0,
      address: "",
      status: "",
      team: "",
      role: "",
    },
  });
  const handleSubmit = (values: z.infer<typeof UserSchema>) => {
    submit(values, { method: "POST" });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new user</CardTitle>
        <CardDescription>
          Please fill in the form below to create a new user
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
              label="Password"
              name="password"
              control={form.control}
              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
              icon={
                showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )
              }
              onClick={() => setShowPassword(!showPassword)}
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
