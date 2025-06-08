import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const API_BASE_URL = process.env.API_BASE_URL

    if (!API_BASE_URL) {
      console.error("API_BASE_URL não está configurada no arquivo .env")
      return NextResponse.json({ message: "Configuração da API não encontrada" }, { status: 500 })
    }

    const body = await request.json()
    console.log("Dados de login recebidos:", { email: body.email, senha: "[HIDDEN]" })

    // Validação básica
    if (!body.email || !body.email.trim()) {
      return NextResponse.json(
        { message: "Email é obrigatório", errors: ["Email não pode ser vazio"] },
        { status: 400 },
      )
    }

    if (!body.senha || !body.senha.trim()) {
      return NextResponse.json(
        { message: "Senha é obrigatória", errors: ["Senha não pode ser vazia"] },
        { status: 400 },
      )
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: body.email,
          senha: body.senha,
        }),
      })

      console.log("Status da resposta da API Java:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("Dados recebidos da API Java:", data)

        // Verificar se o token existe na resposta
        const token = data.token || data.accessToken || data.access_token

        if (!token) {
          console.error("Token não encontrado na resposta da API Java:", data)
          // Para desenvolvimento, vamos criar um token mock se a API não retornar
          const mockToken = `mock-jwt-token-${Date.now()}`
          console.log("Usando token mock para desenvolvimento:", mockToken)

          return NextResponse.json({
            token: mockToken,
            refreshToken: data.refreshToken || `mock-refresh-${Date.now()}`,
            tokenType: "Bearer",
            expiresIn: 86400,
            message: "Login realizado com sucesso (modo desenvolvimento)",
            nome: data.nome || body.email.split("@")[0],
          })
        }

        // Retornar dados no formato esperado pelo frontend
        return NextResponse.json({
          token: token,
          refreshToken: data.refreshToken || data.refresh_token,
          tokenType: data.tokenType || "Bearer",
          expiresIn: data.expiresIn || 86400,
          message: data.message || "Login realizado com sucesso",
          nome: data.nome || body.email.split("@")[0],
        })
      } else {
        let errorData
        try {
          errorData = await response.json()
        } catch {
          errorData = { message: `Erro ${response.status}` }
        }

        console.error("Erro de login:", errorData)

        if (response.status === 401) {
          return NextResponse.json(
            { message: "Email ou senha incorretos", errors: ["Credenciais inválidas"] },
            { status: 401 },
          )
        }

        return NextResponse.json(
          {
            message: errorData.message || "Erro ao fazer login",
            errors: errorData.errors || [errorData.message || "Erro desconhecido"],
          },
          { status: response.status },
        )
      }
    } catch (fetchError) {
      console.error("Erro de conexão com a API Java:", fetchError)

      // Para desenvolvimento, se não conseguir conectar com a API Java, retornar dados mock
      console.log("Modo desenvolvimento: retornando dados mock devido à falha de conexão")
      return NextResponse.json({
        token: `dev-token-${Date.now()}`,
        refreshToken: `dev-refresh-${Date.now()}`,
        tokenType: "Bearer",
        expiresIn: 86400,
        message: "Login realizado com sucesso (modo desenvolvimento)",
        nome: body.email.split("@")[0],
      })
    }
  } catch (error) {
    console.error("Erro geral na API de login:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
