const express = require('express')
const handlers = require('./requestHandlers')
const router = express.Router()

router.post('/create', (req, res) => {
  handlers.createDrink(req.body)
    .then((drink) => {
      res.send(JSON.stringify(drink))
    })
})

router.get('/all', (_, res) => {
  handlers.allDrinks()
    .then((drinks) => {
      res.send(JSON.stringify(drinks))
    })
})

router.get('/allByLiquor', (_, res) => {
  handlers.allByLiquor()
    .then((liquors) => {
      res.send(JSON.stringify(liquors))
    })
})

router.get('/:id', (req, res) => {
  handlers.findById(req.params.id)
    .then((drink) => {
      res.send(JSON.stringify(drink))
    })
})

router.put('/update', (req, res) => {
  handlers.updateDrink(req.body)
    .then(() => {
      res.sendStatus(200)
    })
})

router.patch('/addTags', (req, res) => {
  handlers.addTags(req.body.drinkId, req.body.tagIds)
    .then(() => {
      res.sendStatus(200)
    })
})

router.delete('/delete', (req, res) => {
  handlers.deleteDrink(req.body.id)
    .then(() => {
      res.sendStatus(200)
    })
})

module.exports = router