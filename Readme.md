<h1 id="header" align="center">Shortener Url API</h1>

<p align="center">Esse é um projeto de um encurtador de URL no formato de MONOREPO com 2 Serviços NestJs e Banco de dados PostgreSQL</p>

## Descrição do projeto:

O projeto possui dois serviços sendo um de Usuário onde é feito o cadastro com criptografia na senha e authenticação. <br>
O segundo serviço é de URL onde é possível cadastrar um URL e receber um link de URL encurtado.<br>
O serviço de banco de dados PostgreSQL possui duas tabelas (users, urls) e é compartilhado entre as duas aplicações

## Como testar o projeto:

### Após clonar o projeto

- Instalar as dependências atrávés do seguinte o comando dentro da pasta monorepo:
  - ```sh
    npm install
    ```

* Se certificar de um serviço ativo do Docker;
* Rodar o serviço de banco de dados na raiz do projeto:

  - ```sh
    docker-compose up -build
    ```

* Criar um arquivo .env dentro de packages/database

  - ```sh
    echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"' > packages/database/.env
    ```

* Instalar as tabelas e o schema do bando de dados:

  - ```sh
    npm prisma:setup
    ```

* Criar um arquivo .env dentro de cada projeto (URL, USER) com uma "secret" para criptografia:

  - Exemplo:

  * ```sh
    echo 'JWT_SECRET="shortenerProject"' > apps/url/.env
    ```
  * ```sh
    echo 'JWT_SECRET="shortenerProject"' > apps/user/.env
    ```

* Inicializar o projeto

  - ```sh
    npm run dev
    ```

### Testando

O serviço de usuários estará disponivel na porta `3000` <br>
O serviço de urls estará disponivel na porta `30001`

### Documentação

[Documentação Link](https://documenter.getpostman.com/view/33530098/2sAXjSyTqU)
