const express = require('express')
const handlers = require('./requestHandlers')
const router = express.Router()

router.post('/new', (req, res) => {
  handlers.createDrink(req.body)
    .then((drink) => {
      res.send(JSON.stringify(drink))
    })
})

router.get('/all', (_, res) => {
  handlers.findAllDrinks()
    .then((drinks) => {
      res.send(JSON.stringify(drinks))
    })
})

router.put('/update', (req, res) => {
  handlers.updateDrink(req.body)
    .then(() => {
      res.sendStatus(200)
    })
})

router.delete('/delete', (req, res) => {
  handlers.deleteDrink(req.body)
    .then(() => {
      res.sendStatus(200)
    })
})

module.exports = router