const Sequelize = require('sequelize')
const sequelize = require('../database/database')

const Kind = require('./kind')
const User = require('./user')

const Pet = sequelize.define('pet', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING(50),
    validate: {
      len: [2, 50]
    }
  },
  race: {
    allowNull: false,
    type: Sequelize.STRING(50),
    validate: {
      len: [2, 50]
    }
  },
  age: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  weight: {
    allowNull: false,
    type: Sequelize.DECIMAL(10, 2)
  },
  city: {
    allowNull: false,
    type: Sequelize.STRING(60),
    validate: {
      len: [2, 60]
    }
  },
})

Pet.belongsTo(Kind, {
  foreignKey: {
    allowNull: false
  }
})
Pet.belongsTo(User, {
  foreignKey: {
    allowNull: false
  }
})

module.exports = Pet