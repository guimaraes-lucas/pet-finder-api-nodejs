const jwt = require('jsonwebtoken')
const status = require('http-status')

const User = require('../model/user')

// POST /sign-in
exports.signIn = (request, response, next) => {
  User.findOne({
    where: {
      email: request.body.email,
      password: request.body.password
    }
  })
  .then(user => {
    if (!user) {
      res.status(status.UNAUTHORIZED).send({ message: 'Invalid Login!' })
    }

    const id = user.id
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300
    })
    response.status(status.OK).send({ auth: true, token: token })
  })
  .catch(error => next(error))
}

// POST /sign-out
exports.signOut = (request, response, next) => {
  response.status(status.OK).send({ auth: false, token: null })
}