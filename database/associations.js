module.exports = (sequelize) => {

  const Drink = sequelize.models.Drink
  const Tag = sequelize.models.Tag
  const TagType = sequelize.models.TagType

  Drink.belongsToMany(Tag, { through: 'DrinkTags' })
  Tag.belongsToMany(Drink, { through: 'DrinkTags' })
  Tag.belongsTo(TagType)
  TagType.hasMany(Tag)
  
}