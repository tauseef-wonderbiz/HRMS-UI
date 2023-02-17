export interface IAuth {
    isAuth: boolean
    authToken: string
    user: any
}

export type AuthContextType = {
    isAuth: boolean
    authToken: string
    userName: string
    login: (token: string) => void
    loadUser: () => void
    logout: () => void
}
