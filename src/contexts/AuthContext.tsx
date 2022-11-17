import { createContext, ReactNode,  useState } from "react";

import Router from 'next/router'
import { setCookie } from 'nookies'
import { api } from "../services/axios";


type User = {
  username: string;
}

type SignInCredentials = {
  username: string;
  password: string;
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  user?: User;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)


export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user;

  async function signIn({ username, password }: SignInCredentials) {
    try {
      const response = await api.post('/users/signIn', {
        username,
        password
      })

      console.log(response)

      const { token } = response.data

      setUser({
        username,
      })

      setCookie(undefined, 'auth.token', token, {
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/'
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/')
    } catch (err) {
      console.log(err)
    }

  }


  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }} >
    {children}
    </AuthContext.Provider>
  )
}