import React, { createContext, ReactNode, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
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
  signOut: () => void;
  user?: User;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const router = useRouter()
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'auth.token': token } = parseCookies()

    if (token) {
      api.get('/users/getSession', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        const { username } = response.data 
        setUser({ username })
      })
      .catch(() => {
        destroyCookie(undefined, 'auth.token')

        router.push('/')
      })
    }
  }, [])

  async function signIn({ username, password }: SignInCredentials) {
    try {
      const response = await api.post('/users/signIn', {
        username,
        password
      })

      const { token } = response.data

      setUser({
        username,
      })

      setCookie(undefined, 'auth.token', token, {
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/'
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      router.push('/')
    } catch (err: any) {
      throw new Error(err)
    }
  }

  
  async function signOut() {
    destroyCookie(undefined, 'auth.token')
    
    router.reload()
  }
  
  
  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }} >
    {children}
    </AuthContext.Provider>
  )
}