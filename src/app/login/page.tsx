"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/app/contexts/auth-context"
import { Header } from "@/app/components/header"

export default function LoginPage() {
  const { login } = useAuth()

  // Estados do formulário
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro("")
    setEnviando(true)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      })

      const data = await response.json()

      if (response.ok) {
        const userData = {
          nome: data.nome || email.split("@")[0],
          email: email,
        }
        login(userData, data.token)
      } else {
        setErro(data.message || "Erro ao fazer login")
      }
    } catch (error) {
      console.error("Erro:", error)
      setErro("Erro de conexão")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex items-center justify-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Fazer Login</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">Entre na sua conta</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 sm:p-8">
            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">{erro}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Senha</label>
                <div className="relative">
                  <input
                    type={mostrarSenha ? "text" : "password"}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 transition-colors text-sm sm:text-base"
                    placeholder="Sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {mostrarSenha ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={enviando}
                className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium"
              >
                {enviando ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Não tem conta?{" "}
                <Link href="/register" className="text-blue-600 hover:text-blue-500 transition-colors font-medium">
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
