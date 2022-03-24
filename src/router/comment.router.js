const express = require('express')
const { insert, list, detail, update, destroy, relation, detailRelation } = require('../controllers/comment.controller')

const router = express.Router()

router
  .post('/comment', insert)
  .get('/comment', list)
  .get('/comment/:id', detail)
  .put('/comment/:id', update)
  .delete('/comment/:id', destroy)
  .get('/comment-relation', relation)
  .get('/comment-relation/:id', detailRelation)

module.exports = router
