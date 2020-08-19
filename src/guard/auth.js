const jwt = require('jsonwebtoken')
const status = require('http-status')

exports.verifyJWT = (request, response, next) => {
  const token = request.header('x-access-token')
  if (!token) {
    response
      .status(status.UNAUTHORIZED)
      .send({ auth: false, message: 'No token provided.' })
  }

  jwt.verify(token, process.env.SECRET, function(error, decoded) {
    if (error) {
      response
        .status(status.INTERNAL_SERVER_ERROR)
        .send({ auth: false, message: 'Failed to authenticate token' })
    }

    request.userId = decoded.id
    next()
  })
}