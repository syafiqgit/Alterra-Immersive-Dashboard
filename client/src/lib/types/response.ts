export type ResponseType<T = any> = {
    message: string
    data: T
}

export type PayloadPagination<T = any> = {
    total_users: number
    total_pages: number
    current_page: number
    users: T
}

export type Params = {
    [x: string]: string;
    search: string
    team: string
    role: string
    status: string
}

export type SearchValuesType = {
    searchValues: {
        search: string
        team: string
        role: string
        status: string
    }
}