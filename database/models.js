const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {

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
    thumbnailKey: { 
      type: DataTypes.STRING
    },
    drinkImageKey: { 
      type: DataTypes.STRING
    },
    ingredientImageKey: { 
      type: DataTypes.STRING
    },
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

}