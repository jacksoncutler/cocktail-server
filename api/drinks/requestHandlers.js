const sequelize = require('../../database')

async function createDrink(data) {
  const Drink = sequelize.models.Drink
  return await Drink.create(data, {
    include: {
      model: sequelize.models.Tag,
      include: sequelize.models.TagType
    }
  })
}

async function allDrinks() {
  const [Drink, Tag] = [sequelize.models.Drink, sequelize.models.Tag]
  return await Drink.findAll({
    attributes: ['id', 'name', 'thumbnailKey'],
    include: {
      model: Tag,
      attributes: ['name'],
      through: { attributes: [] }
  },
    order: [['name']]
  })
}

async function allByLiquor() {
  const [TagType, Tag, Drink] = [sequelize.models.TagType, sequelize.models.Tag, sequelize.models.Drink]
  const liquors = await TagType.findOne({
    where: { priority: 0 },
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
      },
      order: [['name']]
    }
  })
  return liquors.Tags
}

async function findById(id) {
  const Drink = sequelize.models.Drink
  const Tag = sequelize.models.Tag
  const TagType = sequelize.models.TagType

  return await Drink.findByPk(id, {
    attributes: ['id', 'name', 'ingredients', 'instructions', 'drinkImageKey', 'ingredientsImageKey'],
    include: {
      model: Tag,
      attributes: ['name'],
      include: {
        model: TagType,
        attributes: ['priority'],
      },
      through: { attributes: [] }
    },
    order: [[Tag, TagType, 'priority']]
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
  createDrink,
  allDrinks,
  allByLiquor,
  findById,
  updateDrink,
  addTags,
  deleteDrink
}