const { success, failed } = require('../helpers/response')
const commentModel = require('../models/comment.model')

const commentController = {
  createComment: async (req, res) => {
    try {
      const setData = {
        recipeID: req.body.recipe_id,
        commentText: req.body.comment_text,
        userID: req.APP_DATA.decode.id
      }
      console.log(setData.userID)
      // Validation
      if (setData.recipeID === '' || setData.commentText === '' || setData.userID === '') {
        failed(res, null, 'Failed', 'All important data must be filled!')
        return
      }
      const result = await commentModel.insertComment(setData)
      success(res, result, 'Succsess', 'Succsess create comment!')
    } catch (err) {
      failed(res, err, 'Failed', 'Failed create comment!')
    }
  },
  getComment: async (req, res) => {
    try {
      const { sortField, sortType, page, limit } = req.query
      const sortByField = sortField || 'id'
      const sortByType = sortType || 'ASC'

      // Pagination
      const getPageValue = page ? Number(page) : 1
      const getLimitValue = limit ? Number(limit) : 2
      const getOffsetValue = (getPageValue - 1) * getLimitValue
      const allData = await commentModel.allData()
      const totalData = Number(allData.rows[0].total)

      commentModel.getComment(sortByField, sortByType, getLimitValue, getOffsetValue)
        .then((result) => {
          const pagination = {
            currentPage: getPageValue,
            dataPerPage: getLimitValue,
            totalPage: Math.ceil(totalData / getLimitValue),
            totalData
          }
          success(res, result.rows, 'succsess', 'Get all comment succsess!', pagination)
        })
        .catch((err) => {
          failed(res, err.message, 'failed', 'get all user failed')
        })
    } catch (err) {
      failed(res, err, 'Failed', 'Failed to display comment!')
    }
  },
  getDetailComment: async (req, res) => {
    try {
      const id = req.params.id
      commentModel.detailComment(id).then((result) => {
        // rowCount is number of data
        if (result.rowCount > 0) {
          success(res, result.rows[0], 'Succsess', 'Success display comment!')
        } else {
          failed(res, null, 'Failed', 'Data not found!')
        }
      })
    } catch (err) {
      failed(res, err, 'Failed', 'Failed to display comment!')
    }
  },
  editComment: async (req, res) => {
    try {
      const id = req.params.id
      const setData = {
        recipeID: req.body.recipe_id,
        commentText: req.body.comment_text,
        userID: req.APP_DATA.decode.id
      }
      // Validation
      if (setData.recipeID === '' || setData.commentText === '' || setData.userID === '') {
        failed(res, null, 'Failed', 'All data must be filled!')
        return
      }
      commentModel.editComment(id, setData).then((result) => {
        if (result.rowCount > 0) {
          success(res, result, 'Succsess', 'Succsess update comment!')
        } else {
          failed(res, null, 'Failed', 'You don\'t update this comment!')
        }
      })
    } catch (err) {
      failed(res, err, 'Failed', 'Failed update comment!')
    }
  },
  delComment: async (req, res) => {
    try {
      const id = req.params.id
      const userID = req.APP_DATA.decode.id
      commentModel.deleteComment(id, userID).then((result) => {
        if (result.rowCount > 0) {
          success(res, result.row, 'Succsess', 'Delete has been successful!')
        } else {
          failed(res, null, 'Failed', 'You don\'t delete this comment!')
        }
      })
    } catch (err) {
      failed(res, err, 'Failed', 'Failed to delete data!')
    }
  },
  commentByRecipe: async (req, res) => {
    try {
      const id = req.params.id
      commentModel.commentByRecipe(id).then((result) => {
        if (result.rowCount > 0) {
          success(res, result.rows, 'Succsess', 'Successfully to display data!')
        } else {
          failed(res, null, 'Failed', 'Data not found!')
        }
      })
    } catch (err) {
      failed(res, null, 'Failed', 'Failed to display data!')
    }
  }
}

module.exports = commentController
