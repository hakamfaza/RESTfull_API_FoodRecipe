const recipeModel = require('../models/recipe.model')

const recipeController = {
  insert: (req, res) => {
    const { id, image, title, ingredients, vidio, date, userid } = req.body
    recipeModel
      .insertRecipe(id, image, title, ingredients, vidio, date, userid)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  list: (req, res) => {
    recipeModel
      .selectAll()
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
      .selectDetail(id)
      .then((result) => {
        res.json(result.rows[0])
      })
      .catch((err) => {
        res.json(err)
      })
  },
  update: (req, res) => {
    const id = req.params.id
    const { image, title, ingredients, vidio, date, userid } = req.body
    recipeModel
      .selectUpdate(id, image, title, ingredients, vidio, date, userid)
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
      .selectDelete(id)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  relasi: (req, res) => {
    recipeModel
      .selectRelasi()
      .then((result) => {
        res.json(result.rows)
      })
      .catch((err) => {
        res.json(err)
      })
  }
}

module.exports = recipeController
