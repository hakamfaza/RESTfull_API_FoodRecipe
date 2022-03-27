const recipeModel = require('../models/recipe.model')

const recipeController = {
  createRecipe: (req, res) => {
    const userID = req.body.user_id
    const { image, title, ingredients, vidio, date } = req.body
    recipeModel
      .insertRecipe(image, title, ingredients, vidio, date, userID)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  getRecipe: (req, res) => {
    recipeModel
      .allRecipe()
      .then((result) => {
        res.json(result.rows)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  getRecipeDetail: (req, res) => {
    const id = req.params.id
    recipeModel
      .detailRecipe(id)
      .then((result) => {
        res.json(result.rows[0])
      })
      .catch((err) => {
        res.json(err)
      })
  },
  editRecipe: (req, res) => {
    const id = req.params.id
    const { image, title, ingredients, vidio, date } = req.body
    const userID = req.body.user_id
    recipeModel
      .updateRecipe(id, image, title, ingredients, vidio, date, userID)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  delRecipe: (req, res) => {
    const id = req.params.id
    recipeModel
      .deleteRecipe(id)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  recipeByUser: (req, res) => {
    const id = req.params.id
    recipeModel
      .recipeByUser(id)
      .then((result) => {
        res.json(result.rows)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  searchRecipe: (req, res) => {
    const title = req.query.search

    recipeModel
      .searchRecipe(title)
      .then((result) => {
        res.json(result.rows)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  latestRecipe: (req, res) => {
    recipeModel
      .latesRecipe()
      .then((result) => {
        res.json(result.rows)
      })
      .catch((err) => {
        res.json(err)
      })
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
