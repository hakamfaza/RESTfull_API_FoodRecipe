const recipeModel = require('../models/recipe.model')
const { success, failed } = require('../helpers/response')

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
      // Validation
      if (setData.image === '' || setData.title === '' || setData.ingredients === '' || setData.userID === '') {
        failed(res, null, 'Failed', 'All important data must be present!')
        return
      }
      const result = await recipeModel.insertRecipe(setData)
      success(res, result, 'Succsess', 'Succses add recipe!')
    } catch (err) {
      failed(res, err, 'Failed', 'Failed to add recipe!')
    }
  },
  getRecipe: async (req, res) => {
    try {
      const data = {
        // validation use ternary
        offset: req.query.page ? req.query.page : req.query.page = 0,
        limit: req.query.limit ? req.query.limit : req.query.limit = 100,
        title: req.query.search ? req.query.search : req.query.search = ''
      }
      recipeModel.getRecipe(data).then((result) => {
      // Condition
        if (result.rowCount > 0) {
          success(res, result.rows, 'Succsess', 'Successful display recipe!')
        } else {
          failed(res, null, 'Failed', 'Data not found!')
        }
      })
    } catch (err) {
      failed(res, err, 'Failed', 'Failed to display recipe!')
    }
  },
  getRecipeDetail: async (req, res) => {
    try {
      const id = req.params.id
      recipeModel.detailRecipe(id).then((result) => {
      // Condition
        if (result.rowCount > 0) {
          success(res, result.rows[0], 'Succsess', 'Succsess to display recipe!')
        } else {
          failed(res, null, 'Failed', 'Data not found!')
        }
      })
    } catch (err) {
      failed(res, err, 'Failed', 'Failed to display recipe!')
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
      // Validation
      if (setData.image === '' || setData.title === '' || setData.ingredients === '' || setData.userID === '') {
        failed(res, null, 'Failed', 'All important data must be present!')
        return
      }
      const result = await recipeModel.editRecipe(id, setData)
      success(res, result.rows, 'Successs', 'Data update succsess!')
    } catch (err) {
      failed(res, null, 'Failed', 'Update data failed!')
    }
  },
  delRecipe: async (req, res) => {
    try {
      const id = req.params.id
      recipeModel.deleteRecipe(id).then((result) => {
        // Condition
        if (result.rowCount > 0) {
          success(res, result.rows, 'Successs', 'Delete data succsess!')
        } else {
          failed(res, null, 'Failed', 'Data not found!')
        }
      })
    } catch (err) {
      failed(res, null, 'Failed', 'Delete data failed!')
    }
  },
  recipeByUser: async (req, res) => {
    try {
      const id = req.params.id
      recipeModel.recipeByUser(id).then((result) => {
        if (result.rowCount > 0) {
          success(res, result.rows, 'Succsess', 'Successful display recipe by user!')
        } else {
          failed(res, null, 'Failed', 'Data not found!')
        }
      })
    } catch (err) {
      failed(res, null, 'Failed', 'Failed display recipe by user!')
    }
  },
  latestRecipe: async (req, res) => {
    try {
      const result = await recipeModel.latesRecipe()
      success(res, result.rows, 'Succsess', 'Successfully displaying the latest 5 recipes!')
    } catch (err) {
      failed(res, err, 'Succsess', 'Failed displaying the latest 5 recipes!')
    }
  }
}

module.exports = recipeController
