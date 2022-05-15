const express = require('express')
const { createRecipe, getRecipe, getRecipeDetail, putRecipe, delRecipe, getAllRecipeByUser, latestRecipe, blockRecipe } = require('../controllers/recipe.controller')

const jwtAuth = require('../middleware/jwtAuth')
const { isAdmin, isCostumer } = require('../middleware/authorization')

const upload = require('../middleware/upload')

const router = express.Router()

router
  .post('/recipe', jwtAuth, isCostumer, upload, createRecipe)
  .get('/recipe', getRecipe)
  .get('/recipe/:id', jwtAuth, getRecipeDetail)
  .put('/recipe/:id', jwtAuth, isCostumer, upload, putRecipe)
  .delete('/recipe/:id', jwtAuth, isCostumer, delRecipe)
  .get('/recipe-by-user', jwtAuth, isCostumer, getAllRecipeByUser)
  .get('/recipe-latest', latestRecipe)
  .put('/block-recipe/:id', jwtAuth, isAdmin, blockRecipe)

module.exports = router
