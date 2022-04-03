const express = require('express')
const { createRecipe, getRecipe, getRecipeDetail, putRecipe, delRecipe, getAllRecipeByUser, recipeByUser, latestRecipe, blockRecipe } = require('../controllers/recipe.controller')

const jwtAuth = require('../middleware/jwtAuth')
const { isAdmin, isCostumer } = require('../middleware/authorization')

const upload = require('../middleware/upload')

const router = express.Router()

router
  .post('/recipe', jwtAuth, isCostumer, upload, createRecipe)
  .get('/recipe', jwtAuth, getRecipe)
  .get('/recipe/:id', jwtAuth, getRecipeDetail)
  .put('/recipe/:id', jwtAuth, isCostumer, upload, putRecipe)
  .delete('/recipe/:id', jwtAuth, isCostumer, delRecipe)
  .get('/recipe-by-user', jwtAuth, isAdmin, getAllRecipeByUser)
  .get('/recipe-by-user/:id', jwtAuth, isAdmin, recipeByUser) // Show recipe by id user
  .get('/recipe-latest', latestRecipe)
  .put('/block-recipe/:id', jwtAuth, isAdmin, blockRecipe)

module.exports = router
