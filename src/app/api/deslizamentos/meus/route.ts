import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const API_BASE_URL = process.env.API_BASE_URL

    if (!API_BASE_URL) {
      console.error("API_BASE_URL não está configurada no arquivo .env")
      return NextResponse.json({ message: "Configuração da API não encontrada" }, { status: 500 })
    }

    // Obter o token - OBRIGATÓRIO para esta rota
    const authHeader = request.headers.get("authorization")
    console.log("Header de autorização recebido:", authHeader ? "Sim" : "Não")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("Token de autorização ausente ou inválido")
      return NextResponse.json(
        {
          message: "Token de autorização necessário",
          details: "O header Authorization deve estar no formato 'Bearer [token]'",
        },
        { status: 401 },
      )
    }

    const token = authHeader.substring(7)

    if (!token || token.trim() === "") {
      console.error("Token vazio após extrair do header")
      return NextResponse.json(
        {
          message: "Token de autorização inválido",
          details: "Token vazio ou inválido",
        },
        { status: 401 },
      )
    }

    console.log("Token extraído:", token.substring(0, 15) + "...")

    // Endpoint específico para buscar deslizamentos do usuário logado
    const url = `${API_BASE_URL}/deslizamentos/meus`

    console.log("Buscando deslizamentos do usuário logado:", url)

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      })

      console.log("Status da resposta:", response.status)

      if (response.ok) {
        let data
        try {
          const contentType = response.headers.get("content-type")
          if (contentType && contentType.includes("application/json")) {
            data = await response.json()
            console.log("Deslizamentos do usuário recebidos:", data)
          } else {
            const textData = await response.text()
            console.log("Resposta não-JSON:", textData)
            data = []
          }
        } catch (parseError) {
          console.error("Erro ao parsear resposta:", parseError)
          data = []
        }

        // Garantir que sempre retornamos um array
        const result = Array.isArray(data) ? data : []
        return NextResponse.json(result)
      } else if (response.status === 401) {
        console.error("API Java retornou erro 401 - token inválido ou expirado")
        let errorMessage = "Token inválido ou expirado"
        try {
          const errorData = await response.json()
          if (errorData && errorData.message) {
            errorMessage = errorData.message
          }
        } catch {}

        return NextResponse.json({ message: errorMessage }, { status: 401 })
      } else if (response.status === 403) {
        console.error("API Java retornou erro 403 - acesso negado")
        return NextResponse.json({ message: "Acesso negado" }, { status: 403 })
      } else {
        let errorData
        try {
          errorData = await response.json()
          console.error("Erro da API Java:", errorData)
        } catch {
          errorData = { message: `Erro ${response.status}` }
        }

        return NextResponse.json(errorData, { status: response.status })
      }
    } catch (fetchError) {
      console.error("Erro de conexão:", fetchError)

      if (fetchError instanceof TypeError && fetchError.message.includes("fetch")) {
        return NextResponse.json(
          { message: `Erro de conexão com a API em ${API_BASE_URL}. Verifique se está rodando.` },
          { status: 503 },
        )
      }

      return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
    }
  } catch (error) {
    console.error("Erro geral na API /deslizamentos/meus:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
