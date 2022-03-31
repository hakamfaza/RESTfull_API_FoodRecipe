const { success, failed } = require('../helpers/response')
const commentModel = require('../models/comment.model')

const commentController = {
  createComment: async (req, res) => {
    try {
      const setData = {
        recipeID: req.body.recipe_id,
        commentText: req.body.comment_text,
        userID: req.body.user_id
      }
      // Validation
      if (setData.recipeID === '' || setData.commentText === '' || setData.userID === '') {
        failed(res, null, 'Failed', 'All important data must be filled!')
        return
      }
      const result = await commentModel.insertComment(setData)
      success(res, result.rows, 'Succsess', 'Succsess create comment!')
    } catch (err) {
      failed(res, err, 'Failed', 'Failed create comment!')
    }
  },
  getComment: async (req, res) => {
    try {
      const data = {
        // Validation use ternary
        limit: req.query.limit ? req.query.limit : req.query.limit = 100,
        offset: req.query.page ? req.query.page : req.query.page = 0
      }
      commentModel.getComment(data).then((result) => {
        // rowCount is number of data
        if (result.rowCount > 0) {
          success(res, result.rows, 'Succsess', 'Success display comment!')
        } else {
          failed(res, null, 'Failed', 'Data not found!')
        }
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
        userID: req.body.user_id
      }
      // Validation
      if (setData.recipeID === '' || setData.commentText === '' || setData.userID === '') {
        failed(res, null, 'Failed', 'All data must be filled!')
        return
      }
      const result = await commentModel.editComment(id, setData)
      success(res, result.rows, 'Succsess', 'Succsess update comment!')
    } catch (err) {
      failed(res, err, 'Failed', 'Failed update comment!')
    }
  },
  delComment: async (req, res) => {
    try {
      const id = req.params.id
      commentModel.deleteComment(id).then((result) => {
        if (result.rowCount > 0) {
          success(res, result.row, 'Succsess', 'Delete has been successful!')
        } else {
          failed(res, null, 'Failed', 'Data not found!')
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
