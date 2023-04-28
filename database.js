const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  host: ':memory:'
})

class Drink extends Model {}
Drink.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: { 
    type: DataTypes.TEXT,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  thumbnailKey: { type: DataTypes.STRING },
  drinkImageKey: { type: DataTypes.STRING },
  ingredientImageKey: { type: DataTypes.STRING },
}, {
  sequelize
})

class Tag extends Model {}
Tag.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize
})

class TagType extends Model {}
TagType.init({
  priority: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
})

Drink.belongsToMany(Tag, { through: 'DrinkTags' })
Tag.belongsToMany(Drink, { through: 'DrinkTags' })
Tag.belongsTo(TagType)
TagType.hasMany(Tag)

module.exports = sequelize