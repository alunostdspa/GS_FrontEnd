"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Mountain, Calendar, AlertTriangle } from "lucide-react"
import { Header } from "@/app/components/header"

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
  }
}

export default function DeslizamentosPage() {
  const [deslizamentos, setDeslizamentos] = useState<Deslizamento[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadDeslizamentos()
  }, [])

  // Substitua a função loadDeslizamentos por esta versão melhorada
  const loadDeslizamentos = async () => {
    try {
      setIsLoading(true)

      console.log("Iniciando carregamento de deslizamentos")

      const response = await fetch("/api/deslizamentos", {
        // Adicionar cache: 'no-store' para evitar problemas de cache
        cache: "no-store",
        // Adicionar timeout para evitar espera infinita
        signal: AbortSignal.timeout(15000), // 15 segundos de timeout
      })

      console.log("Resposta recebida:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("Dados recebidos:", data)
        setDeslizamentos(Array.isArray(data) ? data : [])
      } else {
        console.error("Erro ao carregar deslizamentos:", response.status)
        // Mesmo com erro, definir array vazio para não quebrar a UI
        setDeslizamentos([])
      }
    } catch (error) {
      console.error("Erro detalhado ao carregar deslizamentos:", error)
      // Definir array vazio para não quebrar a UI
      setDeslizamentos([])
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Deslizamentos Registrados</h1>
          <p className="text-gray-600">Visualize todos os registros de deslizamentos da região</p>
        </div>

        {/* Lista de Deslizamentos */}
        {deslizamentos.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum registro encontrado</h3>
            <p className="text-gray-600">Não há registros de deslizamentos no momento.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {deslizamentos.map((deslizamento) => (
              <div key={deslizamento.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center mb-2">
                  <Mountain className="h-5 w-5 text-orange-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">{deslizamento.endereco?.logradouro}</h3>
                </div>

                <p className="text-gray-600 mb-2">{deslizamento.endereco?.bairro}</p>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(deslizamento.dataOcorrencia)}
                </div>

                {deslizamento.descricao && (
                  <p className="text-gray-700 bg-gray-50 p-3 rounded mb-3">{deslizamento.descricao}</p>
                )}

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>CEP: {deslizamento.endereco?.cep}</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      deslizamento.endereco?.bairroRisco === "ALTO"
                        ? "bg-red-100 text-red-800"
                        : deslizamento.endereco?.bairroRisco === "MEDIO"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    Risco {deslizamento.endereco?.bairroRisco?.toLowerCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
