import express, { request, response } from "express"
import { StatusCodes } from "http-status-codes"
const app = express()
const PORT = process.env.PORT || 3000//para lancar a porta no heroku nao podemos definir a portya exata, mas no node podemos definir uma variavel de ambiente ai é possivel pegar da variavel de ambiente ou um valor defow - ele vai tentar pegar da variavel de ambiente o PORT e se ele nao existir sera usado o valor 3000(ele vai setar esse valor deflow que é o 3000)
let users = [
  { id: 1, name: "Marco", age: 29 },
  { id: 2, name: "Tulio", age: 30 },
]

app.use(express.json()) //esta criando um meddle? para informar que todos nossos request vao estar sendo enviados objetos no formato json

app.listen(PORT, () => {
  //o primeiro parametro é a porta e o segundo é uma função de callback (que sera executada apos comecar a "escutar" essa porta especifica)
  console.log(`Servidor rodadndo em http://localhost:${PORT}`) // apos definir a porta ele colocou o consolelog para que possamos acessar facilmente a porta local em que esta sendo rodado o programa sem a necessidade de digitar no browser
})

app.get("/", (request, response) => {
  // o '/' é a rota do recurso que queremos disponibilar, esse simbolo indica a raiz ele usou para nao ter erro ao localizar. depois temos uma funcao de callback com 2 parametros a request e a response
  return response.send("<h1> Trabalhando com o servidor express. <h1>")
})

app.get("/users", (request, response) => {
  return response.send(users)
})
app.get("/users/:userId", (request, response) => {
  // ao adicionar o :userId ele criou uma variavel, o : é para criar a variavel e o userId é o nome da variavel --
  //"/users/:userId" é a rota
  const userId = request.params.userId //a variavel vem de uma requisicao, utilizou o request.params.nome da variavel (ele esta falando que a const userId é um parametro da requisição)
  const user = users.find((user) => {
    //com o find ele vai percorrer a lista e retornar com alguma condicao - o find diferente do filter que retorna um novo array o find ira retornar o primeiro elemento que ele encontrar
    return user.id === Number(userId) // ele esta comparando o user.id (que é da nossa constante users com o que ta vindo na rota)
  })
  return response.send(user)
}) // e assim no ultimo foi criado a rota apos o http://localhost:${PORT}/users/1 vai mostrar somente o user de id 1 , antes ele havia criado a rota ao users que continha todos os usuarios marco e tulio ai criou a opção de aprofundar.

app.post("/users", (request, response) => {
  const newUser = request.body
  users.push(newUser) //pegou o array users e enviou/fez um push(empurrar) da const newUser
  return response.status(StatusCodes.CREATED).send(newUser) //nao é uma boa pratica colocar sempre esse status manualmente, pode usar uma constante para isso - npm install http-status-codes o status é 201 ai usa u statuscodes crated
})

app.put("/users/:userId", (request, response) => {
  //vai enviar um json para a API, encorntrar o id no array e modificar o objeto com o novo que esta sendo enviado
  const userId = request.params.userId //criou a variavel userId
  const updatedUser = request.body // o usuario atualizado é recebido pelo body

  users = users.map((user) => {
    if (Number(userId) === user.id) {
      return updatedUser
    } //se o userId for igual ao id do user vai retornar o novo usuario fazendo a troca pelo novo usuario retornando o novo usuario senao vai fazer o retorno abaixo - user.Id é um valor inteiro/string, sendo necessario converter para numero para nao dar erro
    return user
  })

  return response.send(updatedUser)
})

app.delete("/users/:userId", (request, response) => {
  const userId = request.params.userId

  users = users.filter((user) => user.id !== Number(userId)) //o array users vai virar um novo array somente com os objetos que tiverem o user.id diferente da constante userId
  return response.status(StatusCodes.NO_CONTENT).send()
})
