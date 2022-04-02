const recipeModel = require('../models/recipe.model')
const { success, failed } = require('../helpers/response')

const recipeController = {
  createRecipe: async (req, res) => {
    try {
      console.log(req.file.filename)
      const setData = {
        image: req.file.filename,
        title: req.body.title,
        ingredients: req.body.ingredients,
        vidio: req.file.filename,
        date: req.body.date,
        userID: req.APP_DATA.decode.id,
        isActive: 1
      }

      // Validation
      if (setData.title === '' || setData.ingredients === '' || setData.userID === '') {
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
      const { search, sortField, sortType, page, limit } = req.query
      const getSearch = search || ''
      const sortByField = sortField || 'id'
      const sortByType = sortType || 'ASC'

      // Pagination
      const getPageValue = page ? Number(page) : 1
      const getLimitValue = limit ? Number(limit) : 2
      const getOffsetValue = (getPageValue - 1) * getLimitValue
      const allData = await recipeModel.allData()
      const totalData = Number(allData.rows[0].total)

      recipeModel.getRecipe(getSearch, sortByField, sortByType, getLimitValue, getOffsetValue).then((result) => {
        const pagination = {
          currentPage: getPageValue,
          dataPerPage: getLimitValue,
          totalPage: Math.ceil(totalData / getLimitValue),
          totalData
        }
        success(res, result.rows, 'succsess', 'Get all recipe succsess!', pagination)
        // res.json(result.rows)
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
        userID: req.APP_DATA.decode.id
      }
      // Validation
      if (setData.image === '' || setData.title === '' || setData.ingredients === '' || setData.userID === '') {
        failed(res, null, 'Failed', 'All important data must be present!')
        return
      }
      const result = await recipeModel.editRecipe(id, setData)
      success(res, result.rows, 'Successs', 'Data update succsess!')
    } catch (err) {
      console.log(err.message)
      const userID = req.APP_DATA.decode.id
      if (err.message === `invalid input syntax for type boolean: "${userID}"`) {
        failed(res, null, 'Failed', 'You don\'t update this recipe!')
      } else {
        failed(res, null, 'Failed', 'Update data failed!')
      }
    }
  },
  delRecipe: async (req, res) => {
    try {
      const id = req.params.id
      const userID = req.APP_DATA.decode.id
      recipeModel.deleteRecipe(id, userID).then((result) => {
        // Condition
        if (result.rowCount > 0) {
          success(res, result.rows, 'Successs', 'Delete data succsess!')
        } else {
          failed(res, null, 'Failed', 'Data not found!')
        }
      })
    } catch (err) {
      console.log(err.message)
      // const isError =
      if (err.message === 'Cannot read properties of undefined (reading \'id\')') {
        failed(res, err.message, 'Failed', 'you can\'t delete this recipe!')
      } else {
        failed(res, err.message, 'Failed', 'Delete data failed!')
      }
    }
  },
  getAllRecipeByUser: (req, res) => {
    try {
      recipeModel.getAllRecipeByUser().then((result) => {
        if (result.rowCount > 0) {
          success(res, result.rows, 'succses', 'succsess display all recipe by user!')
        } else {
          failed(res, null, 'failed', 'data not found!')
        }
      })
    } catch (err) {
      failed(res, err.message, 'failed', 'failed display all recipe by user!')
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
  },
  blockRecipe: async (req, res) => {
    try {
      const id = req.params.id
      const block = req.body.block
      const getBlcok = block ? 1 : 0
      recipeModel.blockRecipe(id, getBlcok).then((result) => {
        if (result.rowCount > 0) {
          success(res, result, 'success', 'succsessfully block recipe!')
        } else {
          failed(res, null, 'failed', 'Data not found!')
        }
      })
    } catch (err) {
      failed(res, err.message, 'failed', 'failed block recipe!')
    }
  }
}

module.exports = recipeController
