const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const User = sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
      len: [2, 255]
    }
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
      len: [2, 255]
    }
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING(60),
    validate: {
      len: [2, 60]
    }
  },
  address: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
      len: [2, 255]
    }
  },
})

module.exports = User