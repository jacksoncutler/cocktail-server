const express = require('express')
const sequelize = require('./database')

sequelize.sync()
  .then(() => console.log('db successfully connected'))
  .catch((err) => console.error('db failed to connect:\n' + err))

const app = express() 
app.use(express.json())
app.use('/drinks', require('./api/drinks'))
app.use('/tags', require('./api/tags'))
app.use('/tagTypes', require('./api/tagTypes'))

const port = 9000
app.listen(port, () => {
  console.log(`App listening on port ${port}...`)
})
