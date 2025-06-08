import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const API_BASE_URL = process.env.API_BASE_URL

    if (!API_BASE_URL) {
      console.error("API_BASE_URL não está configurada no arquivo .env")
      return NextResponse.json({ message: "Configuração da API não encontrada" }, { status: 500 })
    }

    const { searchParams } = new URL(request.url)
    const ativos = searchParams.get("ativos")
    const nivel = searchParams.get("nivel")

    let endpoint = "/alertas"

    if (ativos === "true") {
      endpoint = "/alertas/ativos"
    } else if (nivel) {
      endpoint = `/alertas/nivel/${nivel}`
    }

    console.log("Buscando alertas:", `${API_BASE_URL}${endpoint}`)

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })

      console.log("Status da resposta:", response.status)

      if (response.ok) {
        const data = await response.json()
        return NextResponse.json(data)
      } else {
        let errorData
        try {
          errorData = await response.json()
        } catch {
          errorData = { message: `Erro ${response.status}` }
        }

        console.error("Erro da API:", errorData)
        return NextResponse.json(
          { message: errorData.message || "Erro ao buscar alertas" },
          { status: response.status },
        )
      }
    } catch (fetchError) {
      console.error("Erro de conexão:", fetchError)
      return NextResponse.json(
        { message: `Erro de conexão com a API em ${API_BASE_URL}. Verifique se está rodando.` },
        { status: 503 },
      )
    }
  } catch (error) {
    console.error("Erro geral na API de alertas:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const API_BASE_URL = process.env.API_BASE_URL

    if (!API_BASE_URL) {
      return NextResponse.json({ message: "Configuração da API não encontrada" }, { status: 500 })
    }

    const body = await request.json()
    const authHeader = request.headers.get("authorization")

    console.log("Criando alerta:", body)

    // Validações básicas
    if (!body.titulo || !body.titulo.trim()) {
      return NextResponse.json(
        { message: "Título é obrigatório", errors: ["titulo não pode ser vazio"] },
        { status: 400 },
      )
    }

    if (body.titulo.length > 200) {
      return NextResponse.json(
        { message: "Título muito longo", errors: ["titulo deve ter no máximo 200 caracteres"] },
        { status: 400 },
      )
    }

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "application/json",
      }

      if (authHeader && authHeader.startsWith("Bearer ")) {
        headers.Authorization = authHeader
      }

      const response = await fetch(`${API_BASE_URL}/alertas`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      })

      console.log("Status da resposta:", response.status)

      if (response.ok) {
        const data = await response.json()
        return NextResponse.json(data, { status: 201 })
      } else {
        let errorData
        try {
          errorData = await response.json()
        } catch {
          errorData = { message: `Erro ${response.status}` }
        }

        return NextResponse.json(
          {
            message: errorData.message || "Erro ao criar alerta",
            errors: errorData.errors || [errorData.message || "Erro desconhecido"],
          },
          { status: response.status },
        )
      }
    } catch (fetchError) {
      console.error("Erro de conexão:", fetchError)
      return NextResponse.json(
        { message: `Erro de conexão com a API em ${API_BASE_URL}. Verifique se está rodando.` },
        { status: 503 },
      )
    }
  } catch (error) {
    console.error("Erro geral na API de alertas:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
