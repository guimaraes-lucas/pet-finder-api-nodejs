require("dotenv-safe").config()

const express = require('express')
const status = require('http-status')
const authRoute = require('./route/auth')
const kindRoute = require('./route/kind')
const petRoute = require('./route/pet')
const userRoute = require('./route/user')

const app = express()

app.use(express.json())

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*")
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  response.setHeader('Access-Control-Allow-Credentials', true)

  next()
})

app.use('/api', authRoute)
app.use('/api', kindRoute)
app.use('/api', petRoute)
app.use('/api', userRoute)

app.use((request, response, next) => {
  response.status(status.NOT_FOUND).send()
})

app.use((error, request, response, next) => {
  let statusCode = status.INTERNAL_SERVER_ERROR
  if (error.statusCode)  {
    statusCode = error.statusCode
  }

  response.status(statusCode).send({ error: 'Opss! Ocorreu um erro inesperado.' })
})

module.exports = app