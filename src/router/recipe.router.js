const express = require('express')
const { insert, list, detail, update, destroy, relasi } = require('../controllers/recipe.controller')

const router = express.Router()

router
  .post('/recipe', insert)
  .get('/recipe', list)
  .get('/recipe/:id', detail)
  .put('/recipe/:id', update)
  .delete('/recipe/:id', destroy)
  .get('/recipe-relation', relasi)

module.exports = router
