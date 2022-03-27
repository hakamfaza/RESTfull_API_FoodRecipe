const express = require('express')
const { createRecipe, getRecipe, getRecipeDetail, editRecipe, delRecipe, recipeByUser, searchRecipe, latestRecipe, pageList } = require('../controllers/recipe.controller')

const router = express.Router()

router
  .post('/recipe', createRecipe)
  .get('/recipe', getRecipe)
  .get('/recipe/:id', getRecipeDetail)
  .put('/recipe/:id', editRecipe)
  .delete('/recipe/:id', delRecipe)
  .get('/recipeByUser/:id', recipeByUser)
  .get('/recipe-by', searchRecipe)
  .get('/recipe-latest', latestRecipe)
  .get('/recipe-page', pageList)

module.exports = router
