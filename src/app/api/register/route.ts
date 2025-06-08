import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const API_BASE_URL = process.env.API_BASE_URL

    if (!API_BASE_URL) {
      console.error("API_BASE_URL não está configurada no arquivo .env")
      return NextResponse.json({ message: "Configuração da API não encontrada" }, { status: 500 })
    }

    const body = await request.json()
    console.log("Dados de registro recebidos:", {
      nome: body.nome,
      email: body.email,
      telefone: body.telefone,
      senha: "[HIDDEN]",
      endereco: body.endereco,
    })

    // Validações básicas
    if (!body.nome || !body.nome.trim()) {
      return NextResponse.json({ message: "Nome é obrigatório", errors: ["Nome não pode ser vazio"] }, { status: 400 })
    }

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

    if (!body.endereco) {
      return NextResponse.json(
        { message: "Endereço é obrigatório", errors: ["Endereço não pode ser nulo"] },
        { status: 400 },
      )
    }

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nome: body.nome,
          email: body.email,
          telefone: body.telefone,
          senha: body.senha,
          endereco: {
            logradouro: body.endereco.logradouro,
            bairro: body.endereco.bairro,
            cep: body.endereco.cep,
            tipoSolo: body.endereco.tipoSolo,
            altitudeRua: body.endereco.altitudeRua,
            tipoConstrucao: body.endereco.tipoConstrucao,
            bairroRisco: body.endereco.bairroRisco,
            proximoCorrego: body.endereco.proximoCorrego,
          },
        }),
      })

      console.log("Status da resposta da API Java:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("Registro bem-sucedido")

        return NextResponse.json(
          {
            message: data.message || "Usuário cadastrado com sucesso",
            id: data.id,
            email: data.email,
            nome: data.nome,
          },
          { status: 201 },
        )
      } else {
        let errorData
        try {
          errorData = await response.json()
        } catch {
          errorData = { message: `Erro ${response.status}` }
        }

        console.error("Erro de registro:", errorData)

        if (response.status === 409) {
          return NextResponse.json(
            { message: "Email já existe", errors: ["Este email já está sendo usado por outro usuário"] },
            { status: 409 },
          )
        }

        return NextResponse.json(
          {
            message: errorData.message || "Erro ao cadastrar usuário",
            errors: errorData.errors || [errorData.message || "Erro desconhecido"],
          },
          { status: response.status },
        )
      }
    } catch (fetchError) {
      console.error("Erro de conexão com a API Java:", fetchError)
      return NextResponse.json(
        { message: `Erro de conexão com a API em ${API_BASE_URL}. Verifique se está rodando.` },
        { status: 503 },
      )
    }
  } catch (error) {
    console.error("Erro geral na API de registro:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
