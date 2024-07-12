import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginSchema from "../lib/validation/auth.validation";
import { z } from "zod";
import { Form } from "../components/ui/form";
import InputForm from "../components/InputForm";
import { useNavigation, useSubmit } from "react-router-dom";
import { Button } from "../components/ui/button";
import backgroundLogin from "../assets/Alterra background.webp";
import altaLogo1 from "../assets/logo.png";
import { Eye, EyeOff, Loader, Mail } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const submit = useSubmit();
  const { state } = useNavigation();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = (values: z.infer<typeof LoginSchema>) => {
    submit(values, { method: "POST" });
  };
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage: `url(${backgroundLogin})`,
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-4xl font-bold text-white">
                Alterra Immersive Dashboard
              </h2>
              <p className="max-w-xl mt-3 text-white">
                Immersive dashboard is an immersive student data management
                website application at Alterra academy.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <img
                src={altaLogo1}
                alt="Alterra academy"
                loading="lazy"
                className="w-56 mx-auto"
              />
              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Sign in to access your account
              </p>
            </div>
            <div className="mt-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-2"
                >
                  <InputForm
                    label="Email"
                    name="email"
                    control={form.control}
                    placeholder="Enter your email"
                    type="email"
                    icon={<Mail className="size-5" />}
                  />
                  <InputForm
                    label="Password"
                    name="password"
                    control={form.control}
                    placeholder="Enter your password"
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
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={state === "submitting"}
                    >
                      {state === "submitting" ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Sign in"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
