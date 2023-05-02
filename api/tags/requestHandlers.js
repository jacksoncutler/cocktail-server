const sequelize = require('../../database')

async function createTag(data) {
  const Tag = sequelize.models.Tag
  return await Tag.create(data)
}

async function findAllTags() {
  const Tag = sequelize.models.Tag
  return await Tag.findAll({
    include: [
      { model: sequelize.models.Drink },
      { model: sequelize.models.TagType}
    ]
  })
}

async function updateTag(data) {
  const Tag = sequelize.models.Tag
  await Tag.update(data, {
    where: { id: data.id }
  })
}

async function deleteTag(data) {
  const Tag = sequelize.models.Tag
  await Tag.destroy({
    where: { id: data.id }
  })
}

module.exports = {
  findAllTags,
  createTag,
  updateTag,
  deleteTag
}