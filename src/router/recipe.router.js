const express = require('express')
const { createRecipe, getRecipe, getRecipeDetail, putRecipe, delRecipe, recipeByUser, latestRecipe } = require('../controllers/recipe.controller')

const router = express.Router()

router
  .post('/recipe', createRecipe)
  .get('/recipe', getRecipe)
  .get('/recipe/:id', getRecipeDetail)
  .put('/recipe/:id', putRecipe)
  .delete('/recipe/:id', delRecipe)
  .get('/recipe-by-user/:id', recipeByUser) // Show recipe by id user
  .get('/recipe-latest', latestRecipe)

module.exports = router
