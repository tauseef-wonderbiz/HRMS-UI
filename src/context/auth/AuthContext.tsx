import { createContext, useContext, ReactNode, useState } from 'react'
import { AuthContextType } from './auth'

const authContextDefaultValues: AuthContextType = {
    isAuth: false,
    authToken: '',
    userName: '',
    login: () => { },
    loadUser: () => { },
    logout: () => { },
}

const AuthContext = createContext<AuthContextType>(authContextDefaultValues)

export function useAuth() {
    return useContext(AuthContext)
}

type Props = {
    children: ReactNode
}

export function AuthProvider({ children }: Props) {
    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [authToken, setAuthToken] = useState<string>('')
    const [userName, setuserName] = useState<string>('')

    const login = (user: any) => {
        localStorage.setItem('Authorization', 'Bearer ' + user.result.token)
        localStorage.setItem('UserName', user.result.name)

        setIsAuth(true)
        setAuthToken(user.token)
        setuserName(user.userName)
    }


    const loadUser = () => {
        const token = localStorage.getItem('Authorization') || ''
        const name = localStorage.getItem('UserName') || ''


        if (token) {
            setIsAuth(true)
            setAuthToken(token)
            setuserName(name)
        }
    }

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('Authorization')
        localStorage.removeItem('UserName')
        setAuthToken('')
        setuserName('')
    }

    const value = {
        isAuth,
        authToken,
        userName,
        login,
        loadUser,
        logout,
    }

    return (
        <>
            <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
        </>
    )
}
