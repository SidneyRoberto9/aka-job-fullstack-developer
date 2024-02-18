# AKASOFT - UI

### Pre-requisitos

- Node.js
- pnpm

### Instalação

Para instalar as dependências do projeto, foi utilizado o gerenciador de pacotes pnpm. Para instalação do pnpm, execute o comando abaixo:

```bash
npm install -g pnpm
```

Para instalar as dependências, execute o comando abaixo:

```bash
pnpm
```

### Configuração

Para realizar a configuração do projeto, é necessário criar um arquivo .env na raiz do projeto. O arquivo .env.example pode ser utilizado como base para criação do arquivo .env, preencha o NEXTAUTH_SECRET com o mesmo valor do JWT_SECRET da api.

```bash
# API URL
NEXT_PUBLIC_API_URL = http://localhost:3333/api

# Base Application URL
NEXTAUTH_URL = http://localhost:3000

# JWT Secret
NEXTAUTH_SECRET = "randomsecret"
```

## Utilização

Para iniciar o servidor, execute o comando abaixo:

```bash
pnpm dev
```

Caso deseje executar o servidor em modo de produção, execute o comando abaixo:

```bash
pnpm build
pnpm start
```
