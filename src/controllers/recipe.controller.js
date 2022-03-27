const recipeModel = require('../models/recipe.model')

const recipeController = {
  createRecipe: async (req, res) => {
    try {
      const userID = req.body.user_id
      const { image, title, ingredients, vidio, date } = req.body
      const result = await recipeModel.insertRecipe(image, title, ingredients, vidio, date, userID)
      res.json(result)
    } catch (err) {
      res.json(err)
    }
  },
  getRecipe: async (req, res) => {
    try {
      const result = await recipeModel.allRecipe()
      res.json(result.rows)
    } catch (err) {
      res.json(err)
    }
  },
  getRecipeDetail: async (req, res) => {
    try {
      const id = req.params.id
      const result = await recipeModel.detailRecipe(id)
      res.json(result.rows[0])
    } catch (err) {
      res.json(err)
    }
  },
  editRecipe: async (req, res) => {
    try {
      const id = req.params.id
      const { image, title, ingredients, vidio, date } = req.body
      const userID = req.body.user_id
      const result = await recipeModel.updateRecipe(id, image, title, ingredients, vidio, date, userID)
      res.json(result)
    } catch (err) {
      res.json(err)
    }
  },
  delRecipe: async (req, res) => {
    try {
      const id = req.params.id
      const result = await recipeModel.deleteRecipe(id)
      res.json(result)
    } catch (err) {
      res.json(err)
    }
  },
  recipeByUser: async (req, res) => {
    try {
      const id = req.params.id
      const result = await recipeModel.recipeByUser(id)
      res.json(result)
    } catch (err) {
      res.json(err)
    }
  },
  searchRecipe: async (req, res) => {
    try {
      const title = req.query.search
      const result = await recipeModel.searchRecipe(title)
      res.json(result.rows)
    } catch (err) {
      res.json(err)
    }
  },
  latestRecipe: async (req, res) => {
    try {
      const result = await recipeModel.latesRecipe()
      res.json(result.rows)
    } catch (err) {
      res.json(err)
    }
  },
  pageList: async (req, res) => {
    try {
      const offset = req.query.page
      const result = await recipeModel.pageRecipe(offset)
      res.json(result.rows)
    } catch (err) {
      res.json(err)
    }
  }
}

module.exports = recipeController
