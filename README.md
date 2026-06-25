# 🎯 in.orbit

<p align="center">
  <img src="https://github.com/Brendler17/in-orbit/blob/main/client/public/icon.svg" width="180" alt="in.orbit logo"/>
</p>

<p align="center">
  Sistema de gerenciamento de metas semanais para acompanhar hábitos, registrar progresso e manter o foco nos objetivos.
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/Brendler17/in-orbit?style=for-the-badge" />
  <img src="https://img.shields.io/github/last-commit/Brendler17/in-orbit?style=for-the-badge" />
  <img src="https://img.shields.io/github/languages/count/Brendler17/in-orbit?style=for-the-badge" />
  <img src="https://img.shields.io/github/repo-size/Brendler17/in-orbit?style=for-the-badge" />
</p>

---

## 📑 Sumário

- [🎯 in.orbit](#-inorbit)
  - [📑 Sumário](#-sumário)
  - [💻 Sobre](#-sobre)
  - [✨ Funcionalidades](#-funcionalidades)
    - [Metas](#metas)
    - [Progresso](#progresso)
    - [Dashboard](#dashboard)
  - [🛠 Tecnologias](#-tecnologias)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Ferramentas](#ferramentas)
  - [🏗 Arquitetura](#-arquitetura)
  - [🚀 Como Executar](#-como-executar)
    - [Pré-requisitos](#pré-requisitos)
    - [Clone o projeto](#clone-o-projeto)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
  - [⚙ Variáveis de Ambiente](#-variáveis-de-ambiente)
  - [📂 Estrutura do Projeto](#-estrutura-do-projeto)
  - [🎯 Aprendizados](#-aprendizados)
  - [🔮 Melhorias Futuras](#-melhorias-futuras)
  - [👨‍💻 Autor](#-autor)
  - [📄 Licença](#-licença)

---

## 💻 Sobre

O **in.orbit** é uma aplicação para gerenciamento de metas semanais que permite criar objetivos, acompanhar sua evolução e registrar conclusões ao longo da semana.

O projeto foi desenvolvido durante o evento **NLW Pocket: JavaScript** da Rocketseat, recebendo posteriormente melhorias e adaptações próprias para aprofundamento nos conceitos modernos de desenvolvimento full stack.

---

## ✨ Funcionalidades

### Metas

* Criar metas semanais
* Definir quantidade desejada de conclusões
* Visualizar metas cadastradas
* Acompanhar progresso semanal

### Progresso

* Registrar conclusão de metas
* Visualizar percentual de progresso
* Consultar histórico de atividades
* Identificar metas pendentes

### Dashboard

* Resumo semanal
* Quantidade de metas concluídas
* Quantidade restante para atingir os objetivos
* Histórico de registros

---

## 🛠 Tecnologias

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* TanStack Query
* React Hook Form
* Zod
* Radix UI

### Backend

* Node.js
* Fastify
* Drizzle ORM
* PostgreSQL

### Ferramentas

* Docker
* Biome
* Git & GitHub

---

## 🏗 Arquitetura

```text
in-orbit
├── server
│   ├── src
│   │   ├── db
│   │   ├── http
│   │   │    ├── routes
│   │   ├── features
│   │   └── env
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── http
│   │   ├── assets
```

---

## 🚀 Como Executar

### Pré-requisitos

* Node.js 20+
* Docker
* Git

### Clone o projeto

```bash
git clone https://github.com/Brendler17/in-orbit.git
cd in-orbit
```

### Backend

```bash
cd server

npm install

docker compose up -d

npm run db:migrate

npm run dev
```

Servidor disponível em:

```text
http://localhost:3333
```

### Frontend

```bash
cd web

npm install

npm run dev
```

Aplicação disponível em:

```text
http://localhost:5173
```

---

## ⚙ Variáveis de Ambiente

Crie um arquivo:

```bash
.env
```

Exemplo:

```env
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/inorbit
```

---

## 📂 Estrutura do Projeto

O projeto segue uma arquitetura separada entre frontend e backend:

* **client/** → Interface da aplicação
* **server/** → API e regras de negócio

---

## 🎯 Aprendizados

Este projeto foi utilizado para aprofundar conhecimentos em:

* React moderno
* TypeScript
* Gerenciamento de estado assíncrono
* Validação de formulários
* APIs REST
* PostgreSQL
* Drizzle ORM
* Docker
* Arquitetura Full Stack

---

## 🔮 Melhorias Futuras

* [ ] Desfazer meta completada
* [ ] Completar meta apenas 1x ao dia
* [ ] Login com GitHub
* [ ] Autenticação Jwt
* [ ] Rota de perfil
* [ ] Gamificação e level de usuário
* [ ] Navegação entre semanas
* [ ] Deploy em produção
* [ ] Testes automatizados

---

## 👨‍💻 Autor

Desenvolvido por **Gustavo Brendler**

* GitHub: https://github.com/Brendler17
* LinkedIn: https://linkedin.com/in/gustavo-brendler

---

## 📄 Licença

Este projeto está sob a licença MIT.

Consulte o arquivo LICENSE para mais informações.
