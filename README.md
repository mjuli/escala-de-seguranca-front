# Escala de Segurança Front

Este projeto é uma aplicação frontend desenvolvida com Angular e Angular Material para gerenciar a escala de segurança.

## Estrutura do Projeto

- **src/app**: Contém os componentes principais da aplicação.
- **src/assets**: Contém os arquivos estáticos, como imagens e arquivos CSS.
- **src/environments**: Contém os arquivos de configuração dos diferentes ambientes (desenvolvimento, produção).

## Pré-requisitos

- Node.js
- Angular CLI

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/mjuli/escala-de-seguranca-front.git
   cd escala-de-seguranca-front
   ```
   
2. Instale as dependências:

```bash
npm install
```

## Executando a Aplicação

Para executar a aplicação em um servidor local:

```bash
ng serve
```

Abra o navegador e acesse http://localhost:4200/.

## Estrutura dos Componentes:

- **DashboardComponent**: Componente principal que exibe diferentes seções.
- **EscalaComponent**: Gerencia a exibição e operações relacionadas à escala de segurança.
- **LocalComponent**: Gerencia a exibição e operações relacionadas aos locais.
- **MarcacaoEscalaComponent**: Gerencia a exibição e operações relacionadas às marcações de escala.
- **PolicialComponent**: Gerencia a exibição e operações relacionadas aos policiais.
  
## Principais Endpoints

A aplicação se comunica com a API através dos seguintes endpoints:

### Escala

- **GET /api/Escala**: Retorna todas as escalas.
- **POST /api/Escala**: Cria uma nova escala.
- **GET /api/Escala/{id}**: Retorna uma escala específica.
- **PUT /api/Escala/{id}**: Atualiza uma escala específica.
- **DELETE /api/Escala/{id}**: Remove uma escala específica.
- **GET /api/Escala/pagination**: Retorna as escalas paginadas.
- **PATCH /api/Escala/{id}/UpdatePartial**: Atualiza parcialmente uma escala.

### Local

- **GET /api/Local**: Retorna todos os locais.
- **POST /api/Local**: Cria um novo local.
- **GET /api/Local/{id}**: Retorna um local específico.
- **PUT /api/Local/{id}**: Atualiza um local específico.
- **DELETE /api/Local/{id}**: Remove um local específico.
- **GET /api/Local/pagination**: Retorna os locais paginados.
- **PATCH /api/Local/{id}/UpdatePartial**: Atualiza parcialmente um local.

### Marcação de Escala

- **GET /api/MarcacaoEscala**: Retorna todas as marcações de escala.
- **POST /api/MarcacaoEscala**: Cria uma nova marcação de escala.
- **GET /api/MarcacaoEscala/{id}**: Retorna uma marcação de escala específica.
- **PUT /api/MarcacaoEscala/{id}**: Atualiza uma marcação de escala específica.
- **DELETE /api/MarcacaoEscala/{id}**: Remove uma marcação de escala específica.
- **GET /api/MarcacaoEscala/pagination**: Retorna as marcações de escala paginadas.
- **PATCH /api/MarcacaoEscala/{id}/UpdatePartial**: Atualiza parcialmente uma marcação de escala.

### Policial
- **GET /api/Policial**: Retorna todos os policiais.
- **POST /api/Policial**: Cria um novo policial.
- **GET /api/Policial/{id}**: Retorna um policial específico.
- **PUT /api/Policial/{id}**: Atualiza um policial específico.
- **DELETE /api/Policial/{id}**: Remove um policial específico.
- **GET /api/Policial/pagination**: Retorna os policiais paginados.
- **PATCH /api/Policial/{id}/UpdatePartial**: Atualiza parcialmente um policial.
- **GET /api/Policial/filter**: Filtra os policiais por nome ou CPF.
