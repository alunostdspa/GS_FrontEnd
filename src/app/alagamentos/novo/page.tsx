"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { useAuth } from "@/app/contexts/auth-context"
import { Header } from "@/app/components/header"

export default function NovoAlagamentoPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading, getToken } = useAuth()

  // Estados do formulário
  const [formData, setFormData] = useState({
    descricao: "",
    dataOcorrencia: new Date().toISOString().slice(0, 16),
    logradouro: "",
    bairro: "",
    cep: "",
    tipoSolo: "",
    altitudeRua: "",
    tipoConstrucao: "",
    bairroRisco: "",
    proximoCorrego: false,
  })

  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState("")

  // Verificar se está logado
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  // Função para atualizar campos do formulário
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Função para enviar formulário
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro("")
    setEnviando(true)

    try {
      const token = getToken()
      if (!token) {
        setErro("Você precisa estar logado")
        return
      }

      // Montar dados para enviar
      const dados = {
        descricao: formData.descricao || null,
        dataOcorrencia: formData.dataOcorrencia,
        endereco: {
          logradouro: formData.logradouro,
          bairro: formData.bairro,
          cep: formData.cep.replace(/\D/g, ""),
          tipoSolo: formData.tipoSolo,
          altitudeRua: formData.altitudeRua,
          tipoConstrucao: formData.tipoConstrucao,
          bairroRisco: formData.bairroRisco,
          proximoCorrego: formData.proximoCorrego,
        },
      }

      const response = await fetch("/api/alagamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
      })

      if (response.ok) {
        alert("Alagamento registrado com sucesso!")
        router.push("/dashboard")
      } else {
        const errorData = await response.json()
        setErro(errorData.message || "Erro ao registrar")
      }
    } catch (error) {
      console.error("Erro:", error)
      setErro("Erro de conexão")
    } finally {
      setEnviando(false)
    }
  }

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Carregando...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 mb-4 inline-flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Registrar Alagamento</h1>

        {erro && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">{erro}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações básicas */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Informações do Alagamento</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data e Hora *</label>
                <input
                  type="datetime-local"
                  name="dataOcorrencia"
                  value={formData.dataOcorrencia}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Descreva o alagamento..."
                />
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Endereço</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logradouro *</label>
                <input
                  type="text"
                  name="logradouro"
                  value={formData.logradouro}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Rua, Avenida..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bairro *</label>
                  <input
                    type="text"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CEP *</label>
                  <input
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="00000-000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Características */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Características do Local</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Solo *</label>
                <select
                  name="tipoSolo"
                  value={formData.tipoSolo}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Selecione</option>
                  <option value="VEGETACAO">Vegetação</option>
                  <option value="TERRA">Terra</option>
                  <option value="ASFALTO">Asfalto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Altitude da Rua *</label>
                <select
                  name="altitudeRua"
                  value={formData.altitudeRua}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Selecione</option>
                  <option value="NIVEL">Nível</option>
                  <option value="ABAIXO">Abaixo do nível</option>
                  <option value="ACIMA">Acima do nível</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Construção *</label>
                <select
                  name="tipoConstrucao"
                  value={formData.tipoConstrucao}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Selecione</option>
                  <option value="MADEIRA">Madeira</option>
                  <option value="ALVENARIA">Alvenaria</option>
                  <option value="MISTA">Mista</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nível de Risco *</label>
                <select
                  name="bairroRisco"
                  value={formData.bairroRisco}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Selecione</option>
                  <option value="BAIXO">Baixo</option>
                  <option value="MEDIO">Médio</option>
                  <option value="ALTO">Alto</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="proximoCorrego"
                  checked={formData.proximoCorrego}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Próximo a córrego ou rio</span>
              </label>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 text-center"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={enviando}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
            >
              {enviando ? (
                "Salvando..."
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
