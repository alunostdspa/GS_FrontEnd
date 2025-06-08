// Tipos básicos para a aplicação

export interface Endereco {
  logradouro: string
  bairro: string
  cep: string
  tipoSolo: string
  altitudeRua: string
  tipoConstrucao: string
  bairroRisco: string
  proximoCorrego: boolean
}

export interface Alagamento {
  id: number
  usuarioId: number
  descricao: string
  dataOcorrencia: string
  endereco: Endereco
}

export interface Deslizamento {
  id: number
  usuarioId: number
  descricao: string
  dataOcorrencia: string
  endereco: Endereco
}

export interface Usuario {
  nome: string
  email: string
}
