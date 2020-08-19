const status = require('http-status')
const httpUtil = require('../util/http.js')
const sequelize = require('../database/database')
const Sequelize = require('sequelize')

const Pet = require('../model/pet')

const Op = Sequelize.Op

// GET /pets
exports.findAll = (request, response, next) => {
  let treatedResource = 
    httpUtil.treatPageAndLimit(
      request.query.limit, 
      request.query.page
    )
  let filter = {}
  if (request.query.name) {
    filter = { where: { name: { [Op.iLike]: `%${request.query.name}%` }} }
  }

  Pet.findAll({ 
      ...treatedResource, 
      ...filter 
    })
    .then(pets => response.send(pets))
    .catch(error => next(error))
}

// GET /pets/1
exports.findByPk = (request, response, next) => {
  Pet.findByPk(request.params.id)
    .then(pet => {
      if (pet) {
        response.status(status.OK).send(pet)
      } else {
        response.status(status.NOT_FOUND).send({ error: `Pet "${id}" not found!` })
      }
    })
    .catch(error => next(error))
}

// POST /pets
exports.create = (request, response, next) => {
  const name = request.body.name
  const race = request.body.race
  const age = request.body.age
  const weight = request.body.weight
  const city = request.body.city
  const kindId = request.body.kindId
  const userId = request.body.userId
  
  sequelize.transaction(() => {
    return Pet.create({
      name: name,
      race: race,
      age: age,
      weight: weight,
      city: city,
      kindId: kindId,
      userId: userId
    })
  })
  .then(pet => response.status(status.CREATED).send(pet))
  .catch(error => response.status(status.BAD_REQUEST).send({ error: `${error.type} - ${error.message}` }))
}

// PUT /pets/1
exports.update = (request, response, next) => {
  const name = request.body.name
  const race = request.body.race
  const age = request.body.age
  const weight = request.body.weight
  const city = request.body.city
  const kindId = request.body.kindId
  const userId = request.body.userId
  
  sequelize.transaction(() => {
    return Pet.update({
      name: name,
      race: race,
      age: age,
      weight: weight,
      city: city,
      kindId: kindId,
      userId: userId
    },
    { where: { id: request.params.id }})
  })
  .then(pet => response.status(status.OK).send(pet))
  .catch(error => next(error))
}

// DELETE /pets/1
exports.delete = (request, response, next) => {
  Pet.destroy({ where: { id: request.params.id }})
    .then(response.status(status.NO_CONTENT).send({ error: false }))
    .catch(error => next(error))
}
