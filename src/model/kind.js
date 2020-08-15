const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const Kind = sequelize.define('kind', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  description: {
    allowNull: false,
    type: Sequelize.STRING(50),
    validate: {
      len: [2, 50]
    }
  },
})

module.exports = Kind