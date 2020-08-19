const status = require('http-status')

function HttpUtilsException(message, statusCode) {
  this.statusCode = statusCode
  this.message = message
  this.name = "HttpUtilsException"
}

const treatPageAndLimit = (psLimit, psPage) => {
  let limit = parseInt(psLimit || 0)
  let page = parseInt(psPage || 0)
  
  if (!Number.isInteger(limit) || !Number.isInteger(page)) {
    throw new HttpUtilsException(`${status.BAD_REQUEST} - Bad request!`, status.BAD_REQUEST)
  }
  
  const ITEMS_PER_PAGE = 10
  
  limit = limit > ITEMS_PER_PAGE || limit <= 0 ? ITEMS_PER_PAGE : limit
  page = page <= 0 ? 0 : page * limit
    
  return { limit: limit, offset: page }
}

module.exports = {
  treatPageAndLimit
}