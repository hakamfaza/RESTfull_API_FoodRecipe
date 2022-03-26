const express = require('express')
const cors = require('cors')
const { createRecipe, getRecipe, getRecipeDetail, editRecipe, delRecipe, recipeByUser, searchRecipe, latestRecipe } = require('../controllers/recipe.controller')

const router = express.Router()

router
  .post('/recipe', createRecipe)
  .get('/recipe', getRecipe)
  .get('/recipe/:id', cors(), getRecipeDetail)
  .put('/recipe/:id', editRecipe)
  .delete('/recipe/:id', delRecipe)
  .get('/recipeByUser/:id', recipeByUser)
  .get('/recipe-by', searchRecipe)
  .get('/recipe-latest', latestRecipe)

module.exports = router
