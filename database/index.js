const Sequelize = require('sequelize')
const defineModels = require('./models')
const defineAssociations = require('./associations')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  host: ':memory:'
})

defineModels(sequelize)
defineAssociations(sequelize)

module.exports = sequelize