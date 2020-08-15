const express = require('express')
const status = require('http-status')
const kindRoute = require('./route/kind')
const userRoute = require('./route/user')
const petRoute = require('./route/pet')

const app = express()

app.use(express.json())

app.use('/api', kindRoute)
app.use('/api', userRoute)
app.use('/api', petRoute)

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