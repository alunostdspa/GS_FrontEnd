# 🌧️ Climatic Risks App

Um aplicativo web para monitoramento, registro e alerta de riscos climáticos como alagamentos e deslizamentos. Desenvolvido para ajudar comunidades e autoridades a gerenciar e responder a eventos climáticos extremos.

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Instalação](#-instalação)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [API Endpoints](#-api-endpoints)



## ✨ Funcionalidades

- **Responsivo**: Interface adaptada para celulares, tablets e desktops
- **Autenticação**: Sistema completo de login e registro
- **Dashboard**: Painel personalizado para usuários logados
- **Alertas**: Sistema de notificação para novos eventos climáticos
- **Registro**: Capacidade de registrar novos alagamentos e deslizamentos
- **Segurança**: Autenticação JWT e validação de dados

## 🔧 Instalação

1. **Clone o repositório**

\`\`\`bash
git clone https://github.com/seu-usuario/climatic-risks-app.git
cd climatic-risks-app
\`\`\`

2. **Instale as dependências**

\`\`\`bash
npm install
# ou
yarn install
# ou
pnpm install
\`\`\`

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto e adicione as variáveis necessárias (veja a seção [Variáveis de Ambiente](#-variáveis-de-ambiente)).

4. **Execute o servidor de desenvolvimento**

\`\`\`bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
\`\`\`

5. **Acesse o aplicativo**

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

\`\`\`
# API Base URL
API_BASE_URL=http://localhost:8080/api

# JWT Secret
JWT_SECRET=seu_jwt_secret_aqui

# Tempo de expiração do token (em segundos)
TOKEN_EXPIRATION=3600
\`\`\`

## 📡 API Endpoints

### Autenticação

- `POST /api/auth/login` - Login de usuário
- `POST /api/register` - Registro de novo usuário

### Alagamentos

- `GET /api/alagamentos` - Lista todos os alagamentos
- `GET /api/alagamentos/[id]` - Obtém detalhes de um alagamento específico
- `POST /api/alagamentos` - Registra um novo alagamento
- `GET /api/alagamentos/meus` - Lista alagamentos do usuário logado

### Deslizamentos

- `GET /api/deslizamentos` - Lista todos os deslizamentos
- `GET /api/deslizamentos/[id]` - Obtém detalhes de um deslizamento específico
- `POST /api/deslizamentos` - Registra um novo deslizamento
- `GET /api/deslizamentos/meus` - Lista deslizamentos do usuário logado

### Alertas

- `GET /api/alertas` - Lista todos os alertas
- `GET /api/alertas/[id]` - Obtém detalhes de um alerta específico
- `POST /api/alertas` - Cria um novo alerta
- `PUT /api/alertas/[id]/desativar` - Desativa um alerta específico

