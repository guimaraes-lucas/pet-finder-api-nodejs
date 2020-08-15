module.exports = {
  development: {
    database: {
      host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
      port: 5432,
      name: process.env.DB_NAME ? process.env.DB_NAME :'pet-finder-development',
      dialect: 'postgres',
      user: 'postgres',
      password: process.env.DB_NAME ? process.env.DB_PASS :'mypassword'
    }
  },
  test: {
    database: {
      host: 'localhost',
      port: 5432,
      name: 'pet-finder-test',
      dialect: 'postgres',
      user: 'postgres',
      password: 'mypassword'
    }
  },
  production: {
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME,
      dialect: 'postgres',
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    }
  }
}
