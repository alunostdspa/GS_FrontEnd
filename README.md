# 🌧️ Climatic Risks App

Um aplicativo web para monitoramento, registro e alerta de riscos climáticos como alagamentos e deslizamentos. Desenvolvido para ajudar comunidades e autoridades a gerenciar e responder a eventos climáticos extremos.



## Vídeo apresentando os recursos do projeto

Link para o vídeo [https://www.youtube.com/watch?v=pD-QeIuUAKY](https://www.youtube.com/watch?v=pD-QeIuUAKY)

Nele mostramos todas as funcionalidades e paginas do site e tambem como está integrado com o backend e o banco de dados

##  Índice

- [Funcionalidades](#-funcionalidades)
- [Instalação](#-instalação)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Utilização](#-utilização)
- [API Endpoints](#-api-endpoints)



##  Funcionalidades

- **Responsivo**: Interface adaptada para celulares, tablets e desktops
- **Autenticação**: Sistema completo de login e registro
- **Dashboard**: Painel personalizado para usuários logados
- **Alertas**: Sistema de notificação para novos eventos climáticos
- **Registro**: Capacidade de registrar novos alagamentos e deslizamentos
- **Segurança**: Autenticação JWT e validação de dados

##  Instalação

1. **Clone o repositório**

\`\`\`bash
git clone https://github.com/alunostdspa/GS_FrontEnd
cd GS_FrontEnd
\`\`\`

2. **Instale as dependências**

\`\`\`bash
npm install
### ou
yarn install
### ou
pnpm install
\`\`\`

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto e adicione as variáveis necessárias (veja a seção [Variáveis de Ambiente](#-variáveis-de-ambiente)).

4. **Clone o repositório da API para fazer a conexão local**

Abra [https://github.com/ftessmann/climatic-ricks-api/tree/main](https://github.com/ftessmann/climatic-ricks-api/tree/main) e faça o dowload ou crie um clone do repository da api para executa-la localmente.

5. **Execute o servidor de desenvolvimento**

\`\`\`bash
npm run dev
#### ou
yarn dev
#### ou
pnpm dev
\`\`\`

6. **Acesse o aplicativo**

Abra [http://localhost:3000](http://localhost:3000) no seu navegador caso tenha iniciado pelo arquivo local.

#### Ou

Abra [https://gs-frontend-2semestre.vercel.app](https://gs-frontend-2semestre.vercel.app) no seu navegador o link direto para o site feito na vercel.

##  Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

\`\`\`
# API Base URL
API_BASE_URL=https://climatic-ricks-api.onrender.com/api/

# Conecxão com o Banco

DB_URL=jdbc:oracle:thin:@oracle.fiap.com.br:1521:ORCL

DB_USER=rm559617

DB_PASSWORD=180794

# JWT Secret
JWT_PRIVATE_KEY=LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tDQpNSUlCVkFJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0FUNHdnZ0U2QWdFQUFrRUEwdlJhckJObjZsZXM4NGJxDQpqUDdsUHdwTndMcmwrYktYZDFrL2wrVXlGejVrYWY3dUxULytPc1d4S3RLZ0JZWDZ0cjRVeURJbVp2djJjNG1VDQpTU3M1SXdJREFRQUJBa0ErSmxlQVVzZE90ejN4RVZLUTc1ZkNsdHFKYVliUHBkb1NBMjFFNXZWMit4Vk1TYmdqDQo1ekNhZ28rM0RGU3B5MEFYb2I3WnRUNWRSeG82d0o5SG85SkJBaUVBL2NHdk5ZUEVnTUVKaklmYUsycHVCTDk4DQpSaFlmWXZCa3BLUkpqNDRUUHprQ0lRRFUwY3c5NnVJb3dZNHZielV2TlRib2dvQ3NqRjA1Umd0cmREUkZVdkhmDQpPd0lnZlNkQXhmRVdRclp5Z2pnaXQxVUhyQm5STGpRTkNOd3RsekpjQVl4K0c2a0NJUUNQZEJ2SVlOdXh2VWFxDQprcnUyNXBmc2dvdFp4QVBTNTNRcktsbFJvV2VJb1FJZ04wVnhvTkZaOWZpK2tmRU1BLy9SMlVXcU1rUHp2c1BQDQpOV21ZYzVPMzI0Yz0NCi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0NCg==

JWT_PUBLIC_KEY=LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1Gd3dEUVlKS29aSWh2Y05BUUVCQlFBRFN3QXdTQUpCQU5MMFdxd1RaK3BYclBPRzZveis1VDhLVGNDNjVmbXkNCmwzZFpQNWZsTWhjK1pHbis3aTAvL2pyRnNTclNvQVdGK3JhK0ZNZ3lKbWI3OW5PSmxFa3JPU01DQXdFQUFRPT0NCi0tLS0tRU5EIFBVQkxJQyBLRVktLS0tLQ0K

## Utilização

Caso queira um perfil no projeto que já tenha registros pode ser usado:

email :teste@teste.com

senha: teste123

Também pode-se criar um próprio perfil para testar todas as funcionalidades do projeto basta acessar a página de cadastro

##  API Endpoints

### Autenticação

- `POST /api/auth/login` - Login de usuário
- `POST /api/register` - Registro de novo usuário

### Alagamentos

- `GET /api/alagamentos` - Lista todos os alagamentos
- `POST /api/alagamentos` - Registra um novo alagamento
- `GET /api/alagamentos/meus` - Lista alagamentos do usuário logado

### Deslizamentos

- `GET /api/deslizamentos` - Lista todos os deslizamentos
- `POST /api/deslizamentos` - Registra um novo deslizamento
- `GET /api/deslizamentos/meus` - Lista deslizamentos do usuário logado

### Alertas

- `GET /api/alertas` - Lista todos os alertas

