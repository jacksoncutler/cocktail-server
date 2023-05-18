const express = require('express')
const handlers = require('./requestHandlers')
const router = express.Router()

router.post('/create', (req, res) => {
  handlers.createDrink(req.body)
    .then((drink) => {
      res.send(JSON.stringify(drink))
    })
})

router.get('/all', (req, res) => {
  handlers.allDrinks(req.query.tagIds)
    .then((drinks) => {
      res.send(JSON.stringify(drinks))
    })
})

router.get('/allByType', (req, res) => {
  handlers.allByType(req.query.tagIds)
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

router.patch('/removeTags', (req, res) => {
  handlers.removeTags(req.body.drinkId, req.body.tagIds)
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