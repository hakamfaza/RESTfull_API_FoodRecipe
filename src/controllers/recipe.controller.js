const { v4: uuidv4 } = require('uuid')
const recipeModel = require('../models/recipe.model')
const { success, failed } = require('../helpers/response')
const deleteFile = require('../helpers/delete')

const recipeController = {
  createRecipe: async (req, res) => {
    try {
      const id = uuidv4()
      const setData = {
        id,
        image: req.file.filename,
        title: req.body.title,
        ingredients: req.body.ingredients,
        vidio: req.body.vidio,
        date: new Date(),
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
      const isActive = 1

      const getSearch = search || ''
      const sortByField = sortField || 'id'
      const sortByType = sortType || 'ASC'

      // Pagination
      const getPageValue = page ? Number(page) : 1
      const getLimitValue = limit ? Number(limit) : 2
      const getOffsetValue = (getPageValue - 1) * getLimitValue
      const allData = await recipeModel.allData(isActive)
      const totalData = Number(allData.rows[0].total)

      recipeModel.getRecipe(getSearch, sortByField, sortByType, getLimitValue, getOffsetValue, isActive).then((result) => {
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
      failed(res, err.message, 'Failed', 'Failed to display recipe!')
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
      const check = await recipeModel.detailRecipe(id)

      const image = check.rows[0].image

      deleteFile(`./public/${image}`)

      const setData = {
        image: req.file.filename,
        title: req.body.title,
        ingredients: req.body.ingredients,
        vidio: req.body.vidio,
        date: req.body.date,
        userID: req.APP_DATA.decode.id
      }
      // Validation
      if (setData.image === '' || setData.title === '' || setData.ingredients === '' || setData.userID === '') {
        failed(res, null, 'Failed', 'All important data must be present!')
        return
      }
      recipeModel.editRecipe(id, setData).then((result) => {
        if (result.rowCount > 0) {
          success(res, result, 'Successs', 'Data update succsess!')
        } else {
          failed(res, null, 'Failed', 'You don\'t update this recipe!')
        }
      })
    } catch (err) {
      failed(res, err, 'Failed', 'Update data failed!')
    }
  },
  delRecipe: async (req, res) => {
    try {
      const id = req.params.id
      const userID = req.APP_DATA.decode.id
      const check = await recipeModel.detailRecipe(id)

      const image = check.rows[0].image

      deleteFile(`./public/${image}`)

      recipeModel.deleteRecipe(id, userID).then((result) => {
        // Condition
        if (result.rowCount > 0) {
          success(res, result, 'Successs', 'Delete data succsess!')
        } else {
          failed(res, null, 'Failed', 'you can\'t delete this recipe!')
        }
      })
    } catch (err) {
      failed(res, err.message, 'Failed', 'Delete data failed!')
    }
  },
  getAllRecipeByUser: (req, res) => {
    try {
      const id = req.APP_DATA.decode.id

      recipeModel.getAllRecipeByUser(id).then((result) => {
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
      const block = req.body.is_active
      const getBlcok = block ? 1 : 0
      console.log(getBlcok)
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
