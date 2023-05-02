const sequelize = require('../../database')

async function findAllDrinks() {
  const Drink = sequelize.models.Drink
  return await Drink.findAll({
    include: {
      model: sequelize.models.Tag,
      include: sequelize.models.TagType
    }
  })
}

async function createDrink(data) {
  const Drink = sequelize.models.Drink
  return await Drink.create(data, {
    include: {
      model: sequelize.models.Tag,
      include: sequelize.models.TagType
    }
  })
}

async function updateDrink(data) {
  const Drink = sequelize.models.Drink
  await Drink.update(data, {
    where: { id: data.id }
  })
}

async function deleteDrink(data) {
  const Drink = sequelize.models.Drink
  await Drink.destroy({
    where: { id: data.id }
  })
}

module.exports = {
  findAllDrinks,
  createDrink,
  updateDrink,
  deleteDrink
}