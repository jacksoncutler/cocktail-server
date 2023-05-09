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
  deleteTagType
}