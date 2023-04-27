const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  host: ':memory:'
})

module.exports = sequelize