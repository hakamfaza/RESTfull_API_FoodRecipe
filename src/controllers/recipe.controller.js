const recipeModel = require('../models/recipe.model')

const recipeController = {
  insert: (req, res) => {
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
  list: (req, res) => {
    recipeModel
      .allRecipe()
      .then((result) => {
        res.json(result.rows)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  detail: (req, res) => {
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
  update: (req, res) => {
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
  destroy: (req, res) => {
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
  relation: (req, res) => {
    recipeModel
      .allRelation()
      .then((result) => {
        res.json(result.rows)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  detailRelation: (req, res) => {
    const id = req.params.id
    recipeModel
      .detRelation(id)
      .then((result) => {
        res.json(result.rows)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  search: (req, res) => {
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
  latest: (req, res) => {
    recipeModel
      .latesRecipe()
      .then((result) => {
        res.json(result.rows)
      })
      .catch((err) => {
        res.json(err)
      })
  }
}

module.exports = recipeController
