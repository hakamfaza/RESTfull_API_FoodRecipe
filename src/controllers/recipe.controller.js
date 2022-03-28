const recipeModel = require('../models/recipe.model')

const recipeController = {
  createRecipe: async (req, res) => {
    try {
      const setData = {
        image: req.body.image,
        title: req.body.title,
        ingredients: req.body.ingredients,
        vidio: req.vidio,
        date: req.body.date,
        userID: req.body.user_id
      }
      if (setData.image === '' || setData.title === '' || setData.ingredients === '' || setData.userID === '') {
        res.json({
          message: 'All important data must be filled!'
        })
        return
      }
      const result = await recipeModel.insertRecipe(setData)
      res.json(result)
    } catch (err) {
      res.json(err)
    }
  },
  getRecipe: async (req, res) => {
    try {
      const data = {
        offset: req.query.offset === undefined ? req.query.offset = 0 : req.query.offset,
        title: req.query.search === undefined ? req.query.search = '' : req.query.search
      }
      const result = await recipeModel.getRecipe(data)
      if (result.rows.length === 0) {
        res.json({
          message: 'Data not found!'
        })
        return
      }
      res.json(result.rows)
    } catch (err) {
      res.json(err)
    }
  },
  getRecipeDetail: async (req, res) => {
    try {
      const id = req.params.id
      const result = await recipeModel.detailRecipe(id)
      if (result.rows.length === 0) {
        res.json({
          message: 'Data not found!'
        })
        return
      }
      res.json(result.rows[0])
    } catch (err) {
      res.json(err)
    }
  },
  putRecipe: async (req, res) => {
    try {
      const id = req.params.id
      const setData = {
        image: req.body.image,
        title: req.body.title,
        ingredients: req.body.ingredients,
        vidio: req.vidio,
        date: req.body.date,
        userID: req.body.user_id
      }
      if (setData.image === '' || setData.title === '' || setData.ingredients === '' || setData.userID === '') {
        res.json({
          message: 'All important data must be filled!'
        })
        return
      }
      const result = await recipeModel.editRecipe(id, setData)
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
      if (result.rows.length === 0) {
        res.json({
          message: 'Data not found!'
        })
        return
      }
      res.json(result)
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
  }
}

module.exports = recipeController
