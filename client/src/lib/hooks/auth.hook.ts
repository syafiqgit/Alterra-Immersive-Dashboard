import { ActionFunctionArgs, redirect } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { toast } from "../../components/ui/use-toast";

export const loginAction = async ({ request }: ActionFunctionArgs) => {
    const data = Object.fromEntries(await request.formData())
    try {
        await axiosInstance.post("/auth/login", data)
        toast({ title: "Login successfull" })
        return redirect("/dashboard")
    } catch (error: any) {
        toast({ title: error.response.data.message, variant: "destructive", })
        return null
    }
}