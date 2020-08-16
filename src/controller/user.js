const status = require('http-status')
const httpUtil = require('../util/http.js')
const sequelize = require('../database/database')

const User = require('../model/user')

// GET /users
exports.findAll = (request, response, next) => {
  User.findAll(httpUtil.treatPageAndLimit(request.query.limit, request.query.page))
    .then(users => response.send(users))
    .catch(error => next(error))
}

// GET /users/1
exports.findByPk = (request, response, next) => {
  User.findByPk(request.params.id)
    .then(user => {
      if (user) {
        response.status(status.OK).send(user)
      } else {
        response.status(status.NOT_FOUND).send({ error: `User "${id}" not found!` })
      }
    })
    .catch(error => next(error))
}

// POST /users
exports.create = (request, response, next) => {
  const name = request.body.name
  const email = request.body.email
  const password = request.body.password
  const address = request.body.address
  
  sequelize.transaction(() => {
    return User.create({
      name: name,
      email: email,
      password: password,
      address: address,
    })
  })
  .then(user => response.status(status.CREATED).send(user))
  .catch(error => response.status(status.BAD_REQUEST).send({ error: `${error.type} - ${error.message}` }))
}

// PUT /users/1
exports.update = (request, response, next) => {
  const name = request.body.name
  const email = request.body.email
  const password = request.body.password
  const address = request.body.address
  
  sequelize.transaction(() => {
    return User.update({
      name: name,
      email: email,
      password: password,
      address: address,
    },
    { where: { id: request.params.id }})
  })
  .then(user => response.status(status.OK).send(user))
  .catch(error => next(error))
}

// DELETE /users/1
exports.delete = (request, response, next) => {
  User.destroy({ where: { id: request.params.id }})
    .then(response.status(status.NO_CONTENT).send({ error: false }))
    .catch(error => next(error))
}
