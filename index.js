const express = require('express')
const sequelize = require('./database')

sequelize.sync()
  .then(() => console.log('db successfully connected'))
  .catch((err) => console.error('db failed to connect:\n' + err))

const app = express() 

const port = 9000
app.listen(port, () => {
  console.log(`App listening on port ${port}...`)
})
