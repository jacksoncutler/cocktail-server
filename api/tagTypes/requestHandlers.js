const sequelize = require('../../database')

async function createTagType(data) {
  const TagType = sequelize.models.TagType
  return await TagType.create(data)
}

async function allTagTypes() {
  const TagType = sequelize.models.TagType
  return await TagType.findAll({
    attributes: ['name', 'priority'],
    include: {
      model: sequelize.models.Tag,
      attributes: ['name']
    },
    order: [['priority']]
  })
}

async function updateTagType(data) {
  const TagType = sequelize.models.TagType
  await TagType.update(data, {
    where: { id: data.id }
  })
}

async function addTags(tagTypeId, tagIds) {
  const [TagType, Tag] = [sequelize.models.TagType, sequelize.models.Tag]
  const tagType = await TagType.findByPk(tagTypeId)
  const tags = await Tag.findAll({ 
    where: { id: tagIds } 
  })
  await tagType.addTags(tags)
}

async function swapPriority(id1, id2) {
  const TagType = sequelize.models.TagType

  const type1 = await TagType.findByPk(id1)
  const type2 = await TagType.findByPk(id2)
  const tempPriority = type1.priority
  type1.priority = type2.priority
  type2.priority = tempPriority
  type1.save()
  type2.save()
}

async function deleteTagType(id) {
  const TagType = sequelize.models.TagType
  await TagType.destroy({
    where: { id: id }
  })
}

module.exports = {
  createTagType,
  allTagTypes,
  updateTagType,
  addTags,
  swapPriority,
  deleteTagType
}