const status = require('http-status')
const httpUtil = require('../util/http.js')
const sequelize = require('../database/database')

const Kind = require('../model/kind')

// GET /kinds
exports.findAll = (request, response, next) => {
  Kind.findAll(httpUtil.treatPageAndLimit(request.query.limit, request.query.page))
    .then(kinds => response.send({ error: false, kinds }))
    .catch(error => next(error))
}

// GET /kinds/1
exports.findByPk = (request, response, next) => {
  Kind.findByPk(request.params.id)
    .then(kind => {
      if (kind) {
        response.status(status.OK).send({ error: false, kind })
      } else {
        response.status(status.NOT_FOUND).send({ error: `Kind "${id}" not found!` })
      }
    })
    .catch(error => next(error))
}

// POST /kinds
exports.create = (request, response, next) => {    
  sequelize.transaction(() => {
    return Kind.create({
      description: request.body.description
    })
  })
  .then(kind => response.status(status.CREATED).send({ error: false, kind }))
  .catch(error => response.status(status.BAD_REQUEST).send({ error: `${error.type} - ${error.message}` }))
}

// PUT /kinds/1
exports.update = (request, response, next) => {
  sequelize.transaction(() => {
    return Kind.update(
      { description: request.body.description },
      { where: request.params.id }
    )
  })
  .then(kind => response.status(status.OK).send({ error: false, kind }))
  .catch(error => next(error))
}

// DELETE /kinds/1
exports.delete = (request, response, next) => {
  Kind.delete(request.params.id)
    .then(response.status(status.NO_CONTENT).send({ error: false }))
    .catch(error => next(error))
}
