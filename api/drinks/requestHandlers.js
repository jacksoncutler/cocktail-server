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

async function findAllByLiquor() {
  const [TagType, Tag, Drink] = [sequelize.models.TagType, sequelize.models.Tag, sequelize.models.Drink]
  return await TagType.findOne({
    where: { priority: 0 },
    attributes: ['name'],
    include: {
      model: Tag,
      attributes: ['name'],
      include: {
        model: Drink,
        attributes: ['id', 'name', 'thumbnailKey'],
        include: {
          model: Tag,
          attributes: ['name'],
          through: { attributes: [] }
        },
        order: [['name']],
        through: { attributes: [] }
      }
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

async function addTags(drinkId, tagIds) {
  const [Drink, Tag] = [sequelize.models.Drink, sequelize.models.Tag]
  const drink = await Drink.findByPk(drinkId)
  const tags = await Tag.findAll({
    where: { id: tagIds }
  })
  for (const tag of tags) {
    await drink.addTag(tag)
  }
}

async function deleteDrink(data) {
  const Drink = sequelize.models.Drink
  await Drink.destroy({
    where: { id: data.id }
  })
}

module.exports = {
  findAllDrinks,
  findAllByLiquor,
  createDrink,
  updateDrink,
  addTags,
  deleteDrink
}