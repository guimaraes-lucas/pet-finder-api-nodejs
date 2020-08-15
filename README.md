# O que é esse projeto?

Api para app web para pets abandonados encontrarem um novo lar, esse é o projeto de uma API RESTful feita em [Node](https://nodejs.org/en/) + [Express](https://expressjs.com) e que persiste tipos de pets, usuários e seus pets.

# Instalação e execução

Existem duas maneiras de execução a primeira é utilizando o [Docker](https://docs.docker.com/docker-for-windows/install/), com o mesmo executando na maquina, utilize o seguinte comando:

```shell
./script/install.sh
```

A outra maneira é possuindo o banco de dados [PostgreSQL](https://www.postgresql.org/download/) intalado em uma maquina da rede e configurar devidamente os parâmentros/variáveis de ambiente, por exemplo:

```shell
NODE_ENV=production DB_HOST=localhost DB_PORT=5432 DB_USER=max DB_PASS=s3cr3t DB_NAME=example HOST=localhost PORT=3000 npm start
```

# Endpoints

Para testes da API é necessário que uma aplicação cliente que faça requisições aos *endpoints* da ferramenta ou mesmo uma aplicação como o [Postman](https://www.getpostman.com/downloads/) (uma ferramenta que tem como objetivo testar serviços RESTful (Web APIs) por meio do envio de requisições HTTP e da análise do seu retorno.).

| Requisições                           | Descrição                                                  |
| ------------------------------------- | ---------------------------------------------------------- |
| GET `/api/kinds`                      | Retorna uma lista com todos os tipos criados.              |
| GET `/api/kinds/1`                    | Retorna um tipo específica de acordo com id passado.       |
| GET `/api/kinds/?limit=10&page=0`     | Retorna uma lista com limit de 10 de tipos por página.     |
| GET `/api/kinds/?limit=1&page='1=1'`  | Retorna um erro em caso de tentativa de SQLInjection.      |
| POST `/api/kinds`                     | Cria uma tipo.                                             |
| PUT `/api/kinds/1`                    | Altera uma tipo de acordo com id passado.                  |
| DELETE `/api/kinds/1`                 | Deleta uma tipo de acordo com id passado.                  |
| GET `/api/users`                      | Retorna uma lista com todos os usuários criados.           |
| GET `/api/users/1`                    | Retorna um usuário específica de acordo com id passado.    |
| GET `/api/users/?limit=10&page=0`     | Retorna uma lista com limit de 10 de usuários por página.  |
| GET `/api/users/?limit=1&page='1=1'`  | Retorna um erro em caso de tentativa de SQLInjection.      |
| POST `/api/users`                     | Cria uma usuário.                                          |
| PUT `/api/users/1`                    | Altera uma usuário de acordo com id passado.               |
| DELETE `/api/users/1`                 | Deleta uma usuário de acordo com id passado.               |
| GET `/api/pets`                       | Retorna uma lista com todos os pets criados.               |
| GET `/api/pets/1`                     | Retorna um pet específica de acordo com id passado.        |
| GET `/api/pets/?limit=10&page=0`      | Retorna uma lista com limit de 10 de pets por página.      |
| GET `/api/pets/?limit=1&page='1=1'`   | Retorna um erro em caso de tentativa de SQLInjection.      |
| POST `/api/pets`                      | Cria uma pet.                                              |
| PUT `/api/pets/1`                     | Altera uma pet de acordo com id passado.                   |
| DELETE `/api/pets/1`                  | Deleta uma pet de acordo com id passado.                   |

Exemplo de JSON para requisição POST `/api/pets`:

```json
{
  "name": "Bob",
  "age": 13,
  "weight": 2.2,
  "city": "Florianópolis",
  "kindId": 1,
  "userId": 21
}
```
