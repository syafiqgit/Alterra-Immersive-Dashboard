import { redirect } from "react-router-dom"
import axiosInstance from "../axiosInstance"
import { toast } from "../../components/ui/use-toast"
import queryClient from "../queryClient"
import { ResponseType } from "../types/response"
import { UserType } from "../types/user.type"

export const userQuery = {
    queryKey: ["user"],
    queryFn: async () => {
        const { data } = await axiosInstance.get<ResponseType<UserType>>("/user/profile")
        return data.data
    }
}

export const getUserProfile = async () => {
    try {
        return await queryClient.ensureQueryData(userQuery)
    } catch (error: any) {
        toast({ title: error.response.data.message })
        return redirect("/")
    }
}