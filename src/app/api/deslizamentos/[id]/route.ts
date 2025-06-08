import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const API_BASE_URL = process.env.API_BASE_URL

    if (!API_BASE_URL) {
      return NextResponse.json({ message: "Configuração da API não encontrada" }, { status: 500 })
    }

    const id = params.id
    const authHeader = request.headers.get("authorization")

    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
      return NextResponse.json({ message: "ID inválido", errors: ["ID deve ser um número positivo"] }, { status: 400 })
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Token de autorização necessário" }, { status: 401 })
    }

    try {
      const response = await fetch(`${API_BASE_URL}/deslizamentos/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: authHeader,
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

        return NextResponse.json(
          {
            message: errorData.message || "Erro ao buscar deslizamento",
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
    console.error("Erro geral na API de deslizamentos:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const API_BASE_URL = process.env.API_BASE_URL

    if (!API_BASE_URL) {
      return NextResponse.json({ message: "Configuração da API não encontrada" }, { status: 500 })
    }

    const id = params.id
    const body = await request.json()
    const authHeader = request.headers.get("authorization")

    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
      return NextResponse.json({ message: "ID inválido", errors: ["ID deve ser um número positivo"] }, { status: 400 })
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Token de autorização necessário" }, { status: 401 })
    }

    try {
      const response = await fetch(`${API_BASE_URL}/deslizamentos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(body),
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

        return NextResponse.json(
          {
            message: errorData.message || "Erro ao atualizar deslizamento",
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
    console.error("Erro geral na API de deslizamentos:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const API_BASE_URL = process.env.API_BASE_URL

    if (!API_BASE_URL) {
      return NextResponse.json({ message: "Configuração da API não encontrada" }, { status: 500 })
    }

    const id = params.id
    const authHeader = request.headers.get("authorization")

    if (!id || isNaN(Number(id)) || Number(id) <= 0) {
      return NextResponse.json({ message: "ID inválido", errors: ["ID deve ser um número positivo"] }, { status: 400 })
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Token de autorização necessário" }, { status: 401 })
    }

    try {
      const response = await fetch(`${API_BASE_URL}/deslizamentos/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: authHeader,
        },
      })

      console.log("Status da resposta:", response.status)

      if (response.ok || response.status === 204) {
        return NextResponse.json({}, { status: 204 })
      } else {
        let errorData
        try {
          errorData = await response.json()
        } catch {
          errorData = { message: `Erro ${response.status}` }
        }

        return NextResponse.json(
          {
            message: errorData.message || "Erro ao excluir deslizamento",
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
    console.error("Erro geral na API de deslizamentos:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
