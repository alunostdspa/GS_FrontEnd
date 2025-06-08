"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  nome: string
  email: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (userData: User, token: string) => void
  logout: () => void
  getToken: () => string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  // Função simples para obter token
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken")
    }
    return null
  }

  // Verificar se usuário está logado ao carregar a página
  useEffect(() => {
    const token = getToken()
    const savedUser = localStorage.getItem("user")

    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      } catch (error) {
        console.error("Erro ao carregar usuário:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("authToken")
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User, token: string) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    localStorage.setItem("authToken", token)
    router.push("/dashboard")
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("authToken")
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider")
  }
  return context
}
