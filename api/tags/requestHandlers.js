const sequelize = require('../../database')

async function createTag(data) {
  const Tag = sequelize.models.Tag
  return await Tag.create(data)
}

async function allTags() {
  const Tag = sequelize.models.Tag
  return await Tag.findAll({
    attributes: ['id', 'name'],
    include: [
        {
          model: sequelize.models.Drink,
          attributes: ['name'],
          through: { attributes: [] }
        },
        { 
          model: sequelize.models.TagType,
          attributes: ['name', 'priority']
        }
    ],
    order: [['name']]
  })
}

async function allByType() {
  const TagType = sequelize.models.TagType
  const Tag = sequelize.models.Tag
  return await TagType.findAll({
    attributes: ['priority', 'name'],
    include: {
      model: Tag,
      attributes: ['id', 'name'],
    },
    order: [
      ['priority'],
      [Tag, 'name']
  ]
  })
}

async function updateTag(data) {
  const Tag = sequelize.models.Tag
  await Tag.update(data, {
    where: { id: data.id }
  })
}

async function addDrinks(tagId, drinkIds) {
  const [Tag, Drink] = [sequelize.models.Tag, sequelize.models.Drink]
  const tag = await Tag.findByPk(tagId)
  const drinks = await Drink.findAll({
    where: { id: drinkIds }
  })
  await tag.addDrinks(drinks)
}

async function changeType(tagId, tagTypeId) {
  const Tag = sequelize.models.Tag
  const TagType = sequelize.models.TagType

  const tag = await Tag.findByPk(tagId, {
    include: TagType
  })
  const oldType = tag.TagType
  const newType = await TagType.findByPk(tagTypeId)
  oldType.removeTag(tag)
  newType.addTag(tag)
}

async function deleteTag(id) {
  const Tag = sequelize.models.Tag
  await Tag.destroy({
    where: { id: id }
  })
}

module.exports = {
  createTag,
  allTags,
  allByType,
  updateTag,
  addDrinks,
  changeType,
  deleteTag
}