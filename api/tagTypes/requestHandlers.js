const sequelize = require('../../database')

async function createTagType(data) {
  const TagType = sequelize.models.TagType
  return await TagType.create(data)
}

async function findAllTagTypes() {
  const TagType = sequelize.models.TagType
  return await TagType.findAll({
    include: sequelize.models.Tag
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
  for (const tag of tags) {
    await tagType.addTag(tag)
  }
}

async function deleteTagType(data) {
  const TagType = sequelize.models.TagType
  await TagType.destroy({
    where: { id: data.id }
  })
}

module.exports = {
  createTagType,
  findAllTagTypes,
  updateTagType,
  addTags,
  deleteTagType
}