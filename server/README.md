# AKASOFT - API

### Pre-requisitos

- Node.js
- pnpm
- Docker
- Docker-compose

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

Para realizar a configuração do projeto, é necessário criar um arquivo .env na raiz do projeto. O arquivo .env.example pode ser utilizado como base para criação do arquivo .env.

```bash
# Database Url
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5434/mydb?schema=public"

# JWT Secret
JWT_SECRET="randomsecret"
```

## Utilização

Primeiramente inicie o banco de dados com o comando abaixo:

```bash
docker-compose up -d
```

Após o banco de dados estar disponível, execute o comando para o prisma rodar as migrations e atualizar o schema do banco de dados:

```bash
pnpm dlx prisma migrate deploy
```

Para gerar os schemas do prisma, execute o comando abaixo:

```bash
pnpm prisma generate
```

Para iniciar o servidor, execute o comando abaixo:

```bash
pnpm dev
```

Caso deseje executar o servidor em modo de produção, execute o comando abaixo:

```bash
pnpm build
pnpm start
```

### Executando os Tests

Para executar os testes unitários, execute o comando abaixo:

```bash
pnpm test
```

Para executar os testes E2E, execute o comando abaixo:

```bash
pnpm pretest:e2e
pnpm test:e2e
```

Após a execução dos testes, é possível visualizar os mesmos no navegador com o comando abaixo:

```bash
pnpm test:ui
```

### Logging

Toda auditoria e logging é feito através do logger do fastify e fica disponível no terminal onde o servidor está rodando.
