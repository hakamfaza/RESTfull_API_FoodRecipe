const express = require('express')
const { insert, list, detail, update, destroy, relation, detailRelation, search, latest } = require('../controllers/recipe.controller')

const router = express.Router()

router
  .post('/recipe', insert)
  .get('/recipe', list)
  .get('/recipe/:id', detail)
  .put('/recipe/:id', update)
  .delete('/recipe/:id', destroy)
  .get('/recipe-relation', relation)
  .get('/recipe-relation/:id', detailRelation)
  .get('/recipe-by', search)
  .get('/recipe-latest', latest)

module.exports = router
