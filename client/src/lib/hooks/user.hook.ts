import { ActionFunctionArgs, redirect } from "react-router-dom"
import axiosInstance from "../axiosInstance"
import { toast } from "../../components/ui/use-toast"
import queryClient from "../queryClient"
import { PayloadPagination, ResponseType } from "../types/response"
import { UserType } from "../types/user.type"
import { Params } from "../types/response"

export const userQuery = {
    queryKey: ["user"],
    queryFn: async () => {
        const { data } = await axiosInstance.get<ResponseType<UserType>>("/user/profile")
        return data.data
    }
}

export const getAllUsersQuery = (params: Params) => {
    const { search, role, status, team, sort, page } = params
    return {
        queryKey: ["users", search ?? "All", role ?? "All", status ?? "All", team ?? "All", sort ?? "Newest", page ?? 1],
        queryFn: async () => {
            const { data } = await axiosInstance.get<ResponseType<PayloadPagination<UserType[]>>>(
                "/user",
                {
                    params,
                }
            );
            return data.data;
        },
    };
}

export const getOneUserQuery = (id: string | undefined) => {
    return {
        queryKey: ["users", id],
        queryFn: async () => {
            const { data } = await axiosInstance.get<ResponseType<UserType>>(`/user/${id}`);
            return data.data;
        },
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

export const createUserAction = async ({ request }: ActionFunctionArgs) => {
    const value = Object.fromEntries(await request.formData())
    try {
        const { data } = await axiosInstance.post<ResponseType>("/user/create-user", value)
        queryClient.invalidateQueries({ queryKey: ["users"] })
        toast({ title: data.message })
        return redirect("/dashboard/user")
    } catch (error: any) {
        toast({ title: error.response.data.message });
        return null;
    }
}

export const getAllUsers = async ({ request }: { request: Request }) => {
    try {
        const params = Object.fromEntries([
            ...new URL(request.url).searchParams.entries(),
        ]);
        await queryClient.ensureQueryData(getAllUsersQuery(params as Params))
        return { searchValues: { ...params } }
    } catch (error: any) {
        toast({ title: error.response.data.message });
        return null;
    }
}

export const deleteUser = async ({ params }: { params: { id?: string } }) => {
    try {
        const { data } = await axiosInstance.delete<ResponseType>(`/user/delete-user/${params.id}`)
        queryClient.invalidateQueries({ queryKey: ["users"] })
        toast({ title: data.message })
        return redirect("/dashboard/user")
    } catch (error: any) {
        toast({ title: error.response.data.message });
        return null;
    }
}

export const getUserById = async ({ params }: { params: { id?: string } }) => {
    try {
        await queryClient.ensureQueryData(getOneUserQuery(params.id))
        return params.id
    } catch (error: any) {
        toast({ title: error.response.data.message });
        return null;
    }
}

export const editUser = async ({ request, params }: { request: Request, params: { id?: string } }) => {
    const formData = await request.formData();
    const values = Object.fromEntries(formData);
    try {
        const { data } = await axiosInstance.patch<ResponseType>(`/user/update-user/${params.id}`, values);
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast({ title: data.message });
        return redirect("/dashboard/user");
    } catch (error: any) {
        toast({ title: error.data.message });
        return null;
    }
};