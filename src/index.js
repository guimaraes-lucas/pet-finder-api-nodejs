const http = require('http')
const sequelize = require('./database/database')
const app = require('./app')

const isProduction = process.env.NODE_ENV === 'production'

sequelize.sync({ force: !isProduction }).then(() => {
  const port = process.env.PORT || 3000
  const hostname = process.env.HOST || 'localhost'

  app.set('port', port)
  
  const server = http.createServer(app)

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  })
})