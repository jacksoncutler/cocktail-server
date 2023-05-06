const express = require('express')
const handlers = require('./requestHandlers')
const router = express.Router()

router.post('/create', (req, res) => {
  handlers.createTagType(req.body)
    .then((tagType) => {
      res.send(JSON.stringify(tagType))
    })
})

router.get('/all', (_, res) => {
  handlers.allTagTypes()
    .then((tagTypes) => {
      res.send(JSON.stringify(tagTypes))
    })
})

router.put('/update', (req, res) => {
  handlers.updateTagType(req.body)
    .then(() => {
      res.sendStatus(200)
    })
})

router.patch('/addTags', (req, res) => {
  handlers.addTags(req.body.tagTypeId, req.body.tagIds)
    .then(() => {
      res.sendStatus(200)
    })
})

router.delete('/delete', (req, res) => {
  handlers.deleteTagType(req.body)
    .then(() => {
      res.sendStatus(200)
    })
})

module.exports = router