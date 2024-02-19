# Desafio Fullstack: Cotação do Dólar

<h1 align="center">
  <img src="https://raw.githubusercontent.com/akasoft-br/aka-job-fullstack-developer/5bdba1fffa9d204513ab0293c93bab5a7be0bd8e/assets/aka.svg" alt="AKA" width="120">
</h1>
<p align="center">AKASOFT
FULL STACK DEVELOPER</p>
<p align="center">

</p>

## Sobre

Em cada diretório contem um readme com as instruções de como rodar o projeto.

Sobre o layout utilizado, o esboço base esta diponível em [excalidraw](https://excalidraw.com/#json=LKzKJ5v8iV1jnDyaNyrIW,_8v2vwQakbmCoQiIJcPXEg), e a api utilizada para cotação do dólar é a [Awesome API](https://docs.awesomeapi.com.br/api-de-moedas).

Projeto em produção na vercel: [Cotação do Dólar](https://aka-job-fullstack-developer.vercel.app/)

Api em produção no Hugging Face: [Cotação do Dólar](https://sid933-akasoft.hf.space/api/docs)

## Instruções:

Você deverá criar um fork deste projeto, e desenvolver em cima do seu fork. Use o README principal do seu repositório para nos contar como foi resolver seu teste, as decisões tomadas, como você organizou e separou seu código, e principalmente as instruções de como rodar seu projeto, e se você conseguir explicar para ele como fazer isso, você já começou bem!

**Objetivo**: Avaliar os conhecimentos do candidato em tecnologias frontend e backend, com foco em:

- **Next.js 13**: Desenvolvimento de interfaces web modernas e responsivas.
- **Fastify**: Criação de APIs RESTful robustas e performantes.
- **Prisma**: ORM (Object-Relational Mapping) para gerenciamento de dados em PostgreSQL.
- **Segurança**: Criptografia de senhas e comunicação segura.
- **Desenvolvimento Assíncrono**: Implementação de serviços de background.
- **Análise de Dados**: Cálculo de médias, máximas, mínimas e visualização de dados.

## Requisitos

**Frontend**:

- Página de login com autenticação de usuário.
- **Página principal com**:
  - Tabela paginada para consulta de cotações do dólar por data e hora.
  - Média, máxima e mínima da cotação no dia.
  - Gráfico das variações da cotação no dia.
- Layout responsivo para diferentes dispositivos.

**Backend**:

**API RESTful para**:

- Autenticação de usuários.
- Consulta de cotações do dólar.
- Cálculo de médias, máximas e mínimas.
- Serviço de background que verifica a cotação do dólar a cada minuto e registrar as informações no banco de dados.
- Utilização de criptografia para senhas.
- Documentação de sua API utilizando OpenAPI 3.0+

**Tecnologias**:

- **Frontend**: Next.js 13
- **Backend**: Fastify
- **Banco de dados**: PostgreSQL
- **ORM**: Prisma
- **Criptografia**: bcryptjs (ou similar)
- **Gráficos**: Chart.js (ou similar)

### **O que nos impressionaria**:

- Implementar cache para otimizar o desempenho da aplicação.
- Testar a aplicação com Jest e Cypress.
- Ver o código rodando live (Bucket estático S3, Heroku, Railway, Vercel)
- Criar mecanismo de log e auditoria (quando/como/quem etc.).

### **O que nós não gostaríamos**:

- Descobrir que não foi você quem fez seu teste
- Ver commits grandes, sem muita explicação nas mensagens em seu repositório
- Encontrar um commit com as dependências de NPM

### **O que avaliaremos de seu teste**:

- Histórico de commits do git
- As instruções de como rodar o projeto
- Organização, semântica, estrutura, legibilidade, manutenibilidade do seu código
- Alcance dos objetivos propostos
- Adaptação mobile (layout responsivo)
- Componentização e extensibilidade dos componentes Typescript.

## **FAQ**

_Como devo fazer a entrega do meu desafio?_

- Envie o link do seu repositório de código particular para contato@akasoft.com.br com o assunto: "AKASOFT - DESAFIO FULLSTACK - **:SEU NOME:**"

_Se eu tiver alguma dúvida?_

- Entre em contato com nosso time ou pelo contato@akasoft.com.br
