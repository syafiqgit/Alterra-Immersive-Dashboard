import { ReactNode } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

type Props = {
  label: string;
  name: string;
  control: any;
  type: string;
  placeholder: string;
  icon?: ReactNode;
  onClick?: () => void;
};

export default function InputForm(props: Props) {
  const { label, name, control, placeholder, type, icon, onClick } = props;
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input placeholder={placeholder} {...field} type={type} />
              <span
                className="absolute inset-y-0 end-0 grid place-content-center px-4 text-gray-500 dark:text-white"
                onClick={onClick}
              >
                {icon}
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
