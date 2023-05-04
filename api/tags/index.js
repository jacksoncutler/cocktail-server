const express = require('express')
const handlers = require('./requestHandlers')
const router = express.Router()

router.post('/new', (req, res) => {
  handlers.createTag(req.body)
    .then((tag) => {
      res.send(JSON.stringify(tag))
    })
})

router.get('/all', (_, res) => {
  handlers.allTags()
    .then((tags) => {
      res.send(JSON.stringify(tags))
    })
})

router.get('/allByType', (_, res) => {
  handlers.allByType()
    .then((tags) => {
      res.send(JSON.stringify(tags))
    })
})

router.put('/update', (req, res) => {
  handlers.updateTag(req.body)
    .then(() => {
      res.sendStatus(200)
    })
})

router.patch('/addDrinks', (req, res) => {
  handlers.addDrinks(req.body.tagId, req.body.drinkIds)
    .then(() => {
      res.sendStatus(200)
    })
})

router.delete('/delete', (req, res) => {
  handlers.deleteTag(req.body)
    .then(() => {
      res.sendStatus(200)
    })
})

module.exports = router