"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Shield,
  MapPin,
  AlertTriangle,
  Bell,
  Activity,
  Plus,
  Trash2,
  Calendar,
  Mountain,
  RefreshCw,
} from "lucide-react"
import { useAuth } from "@/app/contexts/auth-context"
import { Header } from "@/app/components/header"

interface Alagamento {
  id: number
  usuarioId: number
  descricao: string
  dataOcorrencia: string
  endereco: {
    logradouro: string
    bairro: string
    cep: string
    bairroRisco: string
    tipoSolo?: string
    altitudeRua?: string
    tipoConstrucao?: string
    proximoCorrego?: boolean
  }
}

interface Deslizamento {
  id: number
  usuarioId: number
  descricao: string
  dataOcorrencia: string
  endereco: {
    logradouro: string
    bairro: string
    cep: string
    bairroRisco: string
    tipoSolo?: string
    altitudeRua?: string
    tipoConstrucao?: string
    proximoCorrego?: boolean
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, getToken } = useAuth()
  const [meusAlagamentos, setMeusAlagamentos] = useState<Alagamento[]>([])
  const [meusDeslizamentos, setMeusDeslizamentos] = useState<Deslizamento[]>([])
  const [alertasAtivos, setAlertasAtivos] = useState(0)
  const [loadingAlagamentos, setLoadingAlagamentos] = useState(true)
  const [loadingDeslizamentos, setLoadingDeslizamentos] = useState(true)
  const [loadingAlertas, setLoadingAlertas] = useState(true)
  const [errorAlagamentos, setErrorAlagamentos] = useState<string | null>(null)
  const [errorDeslizamentos, setErrorDeslizamentos] = useState<string | null>(null)

  // Função para carregar alertas ativos
  const loadAlertasAtivos = useCallback(async () => {
    try {
      setLoadingAlertas(true)
      const resposta = await fetch("/api/alertas?ativos=true")

      if (resposta.ok) {
        const dados = await resposta.json()
        setAlertasAtivos(dados.length || 0)
      }
    } catch (error) {
      console.error("Erro ao carregar alertas:", error)
    } finally {
      setLoadingAlertas(false)
    }
  }, [])

  // Função para carregar alagamentos do usuário
  const loadMeusAlagamentos = useCallback(async () => {
    try {
      setLoadingAlagamentos(true)
      setErrorAlagamentos(null)

      console.log("=== CARREGANDO ALAGAMENTOS DO USUÁRIO ===")
      console.log("Usuário autenticado:", isAuthenticated)
      console.log("Dados do usuário:", user)

      const token = getToken()
      if (!token) {
        console.error("Token não disponível para carregar alagamentos")
        setErrorAlagamentos("Token de autenticação não encontrado")
        setMeusAlagamentos([])
        return
      }

      console.log("Token obtido para alagamentos:", token.substring(0, 15) + "...")

      const response = await fetch("/api/alagamentos/meus", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      })

      console.log("Status da resposta (alagamentos):", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("✅ Alagamentos carregados:", data)
        setMeusAlagamentos(Array.isArray(data) ? data : [])
      } else if (response.status === 401) {
        console.error("❌ Token inválido ou expirado")
        setErrorAlagamentos("Sessão expirada. Faça login novamente.")
      } else {
        // Melhor tratamento de erro com mais detalhes
        let errorMessage = `Erro ${response.status}`
        try {
          const errorData = await response.json()
          console.error("❌ Erro detalhado da API:", errorData)
          errorMessage = errorData.message || errorData.error || `Erro ${response.status}: ${response.statusText}`
        } catch (parseError) {
          console.error("❌ Erro ao parsear resposta de erro:", parseError)
          errorMessage = `Erro ${response.status}: ${response.statusText || "Resposta inválida do servidor"}`
        }

        console.error("❌ Erro ao carregar alagamentos:", errorMessage)
        setErrorAlagamentos(errorMessage)
      }
    } catch (error) {
      console.error("❌ Erro de conexão ao carregar alagamentos:", error)
      setErrorAlagamentos("Erro de conexão. Verifique se a API está rodando.")
    } finally {
      setLoadingAlagamentos(false)
    }
  }, [getToken, isAuthenticated, user])

  // Função para carregar deslizamentos do usuário
  const loadMeusDeslizamentos = useCallback(async () => {
    try {
      setLoadingDeslizamentos(true)
      setErrorDeslizamentos(null)

      console.log("=== CARREGANDO DESLIZAMENTOS DO USUÁRIO ===")
      console.log("Usuário autenticado:", isAuthenticated)
      console.log("Dados do usuário:", user)

      const token = getToken()
      if (!token) {
        console.error("Token não disponível para carregar deslizamentos")
        setErrorDeslizamentos("Token de autenticação não encontrado")
        setMeusDeslizamentos([])
        return
      }

      console.log("Token obtido para deslizamentos:", token.substring(0, 15) + "...")

      const response = await fetch("/api/deslizamentos/meus", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      })

      console.log("Status da resposta (deslizamentos):", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("✅ Deslizamentos carregados:", data)
        setMeusDeslizamentos(Array.isArray(data) ? data : [])
      } else if (response.status === 401) {
        console.error("❌ Token inválido ou expirado")
        setErrorDeslizamentos("Sessão expirada. Faça login novamente.")
      } else {
        // Melhor tratamento de erro com mais detalhes
        let errorMessage = `Erro ${response.status}`
        try {
          const errorData = await response.json()
          console.error("❌ Erro detalhado da API:", errorData)
          errorMessage = errorData.message || errorData.error || `Erro ${response.status}: ${response.statusText}`
        } catch (parseError) {
          console.error("❌ Erro ao parsear resposta de erro:", parseError)
          errorMessage = `Erro ${response.status}: ${response.statusText || "Resposta inválida do servidor"}`
        }

        console.error("❌ Erro ao carregar deslizamentos:", errorMessage)
        setErrorDeslizamentos(errorMessage)
      }
    } catch (error) {
      console.error("❌ Erro de conexão ao carregar deslizamentos:", error)
      setErrorDeslizamentos("Erro de conexão. Verifique se a API está rodando.")
    } finally {
      setLoadingDeslizamentos(false)
    }
  }, [getToken, isAuthenticated, user])

  // Verificar autenticação
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log("Usuário não autenticado, redirecionando para login")
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  // Carregar dados quando autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("=== USUÁRIO AUTENTICADO, CARREGANDO DADOS ===")
      console.log("Usuário:", user)
      loadMeusAlagamentos()
      loadMeusDeslizamentos()
      loadAlertasAtivos()
    }
  }, [isAuthenticated, user, loadMeusAlagamentos, loadMeusDeslizamentos, loadAlertasAtivos])

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este registro?")) return

    try {
      const token = getToken()
      if (!token) {
        alert("Token de autenticação não encontrado")
        return
      }

      const response = await fetch(`/api/alagamentos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok || response.status === 204) {
        setMeusAlagamentos(meusAlagamentos.filter((a) => a.id !== id))
        alert("Alagamento excluído com sucesso!")
      } else {
        alert("Erro ao excluir alagamento")
      }
    } catch (error) {
      console.error("Erro ao excluir:", error)
      alert("Erro ao excluir alagamento")
    }
  }

  const handleDeleteDeslizamento = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este registro?")) return

    try {
      const token = getToken()
      if (!token) {
        alert("Token de autenticação não encontrado")
        return
      }

      const response = await fetch(`/api/deslizamentos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok || response.status === 204) {
        setMeusDeslizamentos(meusDeslizamentos.filter((d) => d.id !== id))
        alert("Deslizamento excluído com sucesso!")
      } else {
        alert("Erro ao excluir deslizamento")
      }
    } catch (error) {
      console.error("Erro ao excluir:", error)
      alert("Erro ao excluir deslizamento")
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString("pt-BR")
    } catch {
      return dateString
    }
  }

  const getRiskColor = (risco: string) => {
    switch (risco?.toUpperCase()) {
      case "ALTO":
        return "bg-red-100 text-red-800"
      case "MEDIO":
        return "bg-yellow-100 text-yellow-800"
      case "BAIXO":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Dashboard Content */}
      <div className="py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2 truncate">
              Bem-vindo, {user?.nome}!
            </h1>
            <p className="text-sm sm:text-base text-gray-600">Sua central de monitoramento de riscos climáticos</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 mr-3 sm:mr-4 flex-shrink-0">
                  <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Status Geral</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">Ativo</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 mr-3 sm:mr-4 flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Meus Alagamentos</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">
                    {loadingAlagamentos ? "..." : meusAlagamentos.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-100 mr-3 sm:mr-4 flex-shrink-0">
                  <Mountain className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Meus Deslizamentos</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">
                    {loadingDeslizamentos ? "..." : meusDeslizamentos.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-100 mr-3 sm:mr-4 flex-shrink-0">
                  <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Alertas Ativos</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">
                    {loadingAlertas ? "..." : alertasAtivos}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Meus Alagamentos */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Meus Alagamentos</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={loadMeusAlagamentos}
                      disabled={loadingAlagamentos}
                      className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      title="Atualizar"
                    >
                      <RefreshCw className={`h-4 w-4 ${loadingAlagamentos ? "animate-spin" : ""}`} />
                    </button>
                    <Link
                      href="/alagamentos/novo"
                      className="bg-blue-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-700 flex items-center text-xs sm:text-sm transition-colors"
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Novo Registro</span>
                      <span className="sm:hidden">Novo</span>
                    </Link>
                  </div>
                </div>

                {errorAlagamentos && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded mb-4 text-xs sm:text-sm">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                      <span className="flex-1 min-w-0 truncate">{errorAlagamentos}</span>
                      <button
                        onClick={loadMeusAlagamentos}
                        className="ml-auto text-red-600 hover:text-red-800 p-1 rounded transition-colors flex-shrink-0"
                      >
                        <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {loadingAlagamentos ? (
                  <div className="text-center py-6 sm:py-8">
                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600 mx-auto mb-3 sm:mb-4"></div>
                    <p className="text-sm sm:text-base text-gray-600">Carregando seus registros...</p>
                  </div>
                ) : meusAlagamentos.length === 0 ? (
                  <div className="text-center py-6 sm:py-8">
                    <AlertTriangle className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">
                      Nenhum registro encontrado
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 sm:mb-4">Você ainda não registrou nenhum alagamento.</p>
                    <Link
                      href="/alagamentos/novo"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 inline-flex items-center text-sm transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Registrar Primeiro Alagamento
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto">
                    {meusAlagamentos.map((alagamento) => (
                      <div
                        key={alagamento.id}
                        className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center mb-1 sm:mb-2">
                              <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600 mr-1.5 sm:mr-2 flex-shrink-0" />
                              <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">
                                {alagamento.endereco?.logradouro}
                              </h4>
                            </div>

                            <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">
                              {alagamento.endereco?.bairro}
                            </p>

                            <div className="flex items-center text-xs text-gray-500 mb-1.5 sm:mb-2">
                              <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                              <span className="truncate">{formatDate(alagamento.dataOcorrencia)}</span>
                            </div>

                            {alagamento.descricao && (
                              <p className="text-xs sm:text-sm text-gray-700 bg-gray-50 p-1.5 sm:p-2 rounded mb-1.5 sm:mb-2 overflow-hidden">
                                <span className="line-clamp-2">{alagamento.descricao}</span>
                              </p>
                            )}

                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 text-xs text-gray-600">
                              <span className="truncate">CEP: {alagamento.endereco?.cep}</span>
                              <span
                                className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-medium ${getRiskColor(alagamento.endereco?.bairroRisco)}`}
                              >
                                Risco {alagamento.endereco?.bairroRisco?.toLowerCase()}
                              </span>
                              {alagamento.endereco?.proximoCorrego && (
                                <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                  Próximo a córrego
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                            <button
                              onClick={() => handleDelete(alagamento.id)}
                              className="text-red-600 hover:text-red-700 p-1.5 sm:p-2 rounded hover:bg-red-50 transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Ações Rápidas</h2>
                <div className="space-y-3 sm:space-y-4">
                  <Link
                    href="/alagamentos/novo"
                    className="w-full flex items-center p-3 sm:p-4 text-left bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                  >
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-gray-900">Registrar Alagamento</span>
                  </Link>

                  <Link
                    href="/deslizamentos/novo"
                    className="w-full flex items-center p-3 sm:p-4 text-left bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors"
                  >
                    <Mountain className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-gray-900">Registrar Deslizamento</span>
                  </Link>

                  <Link
                    href="/alagamentos"
                    className="w-full flex items-center p-3 sm:p-4 text-left bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
                  >
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-gray-900">Ver Todos os Alagamentos</span>
                  </Link>

                  <Link
                    href="/deslizamentos"
                    className="w-full flex items-center p-3 sm:p-4 text-left bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-colors"
                  >
                    <Mountain className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-gray-900">Ver Todos os Deslizamentos</span>
                  </Link>

                  <Link
                    href="/alertas"
                    className="w-full flex items-center p-3 sm:p-4 text-left bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
                  >
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-gray-900">Ver Alertas da Defesa Civil</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Meus Deslizamentos */}
          <div className="mt-6 sm:mt-8">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Meus Deslizamentos</h2>
                <div className="flex gap-2">
                  <button
                    onClick={loadMeusDeslizamentos}
                    disabled={loadingDeslizamentos}
                    className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Atualizar"
                  >
                    <RefreshCw className={`h-4 w-4 ${loadingDeslizamentos ? "animate-spin" : ""}`} />
                  </button>
                  <Link
                    href="/deslizamentos/novo"
                    className="bg-orange-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-orange-700 flex items-center text-xs sm:text-sm transition-colors"
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Novo Registro</span>
                    <span className="sm:hidden">Novo</span>
                  </Link>
                </div>
              </div>

              {errorDeslizamentos && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded mb-4 text-xs sm:text-sm">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2 flex-shrink-0" />
                    <span className="flex-1 min-w-0 truncate">{errorDeslizamentos}</span>
                    <button
                      onClick={loadMeusDeslizamentos}
                      className="ml-auto text-red-600 hover:text-red-800 p-1 rounded transition-colors flex-shrink-0"
                    >
                      <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                </div>
              )}

              {loadingDeslizamentos ? (
                <div className="text-center py-6 sm:py-8">
                  <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-orange-600 mx-auto mb-3 sm:mb-4"></div>
                  <p className="text-sm sm:text-base text-gray-600">Carregando seus registros...</p>
                </div>
              ) : meusDeslizamentos.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <Mountain className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">
                    Nenhum registro encontrado
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 sm:mb-4">Você ainda não registrou nenhum deslizamento.</p>
                  <Link
                    href="/deslizamentos/novo"
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 inline-flex items-center text-sm transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Registrar Primeiro Deslizamento
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {meusDeslizamentos.map((deslizamento) => (
                    <div
                      key={deslizamento.id}
                      className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-1 sm:mb-2">
                            <Mountain className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-600 mr-1.5 sm:mr-2 flex-shrink-0" />
                            <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">
                              {deslizamento.endereco?.logradouro}
                            </h4>
                          </div>

                          <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">
                            {deslizamento.endereco?.bairro}
                          </p>

                          <div className="flex items-center text-xs text-gray-500 mb-1.5 sm:mb-2">
                            <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{formatDate(deslizamento.dataOcorrencia)}</span>
                          </div>

                          {deslizamento.descricao && (
                            <p className="text-xs sm:text-sm text-gray-700 bg-gray-50 p-1.5 sm:p-2 rounded mb-1.5 sm:mb-2 overflow-hidden">
                              <span className="line-clamp-2">{deslizamento.descricao}</span>
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 text-xs text-gray-600">
                            <span className="truncate">CEP: {deslizamento.endereco?.cep}</span>
                            <span
                              className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-medium ${getRiskColor(deslizamento.endereco?.bairroRisco)}`}
                            >
                              Risco {deslizamento.endereco?.bairroRisco?.toLowerCase()}
                            </span>
                            {deslizamento.endereco?.proximoCorrego && (
                              <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                Próximo a córrego
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleDeleteDeslizamento(deslizamento.id)}
                            className="text-red-600 hover:text-red-700 p-1.5 sm:p-2 rounded hover:bg-red-50 transition-colors"
                            title="Excluir"
                          >
                            <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
