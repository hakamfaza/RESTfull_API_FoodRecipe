const commentModel = require('../models/comment.model')

const commentController = {
  createComment: async (req, res) => {
    try {
      const setData = {
        recipeID: req.body.recipe_id,
        commentText: req.body.comment_text,
        userID: req.body.user_id
      }
      if (setData.recipeID === '' || setData.commentText === '' || setData.userID === '') {
        res.json({
          message: 'All data must be filled!'
        })
        return
      }
      const result = await commentModel.insertComment(setData)
      res.json(result)
    } catch (err) {
      res.json(err)
    }
  },
  getComment: async (req, res) => {
    try {
      const data = {
        offset: req.query.offset === undefined ? req.query.offset = 0 : req.query.offset
      }
      const result = await commentModel.getComment(data)
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
  getDetailComment: async (req, res) => {
    try {
      const id = req.params.id
      const result = await commentModel.detailComment(id)
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
  editComment: async (req, res) => {
    try {
      const id = req.params.id
      const setData = {
        recipeID: req.body.recipe_id,
        commentText: req.body.comment_text,
        userID: req.body.user_id
      }
      if (setData.recipeID === '' || setData.commentText === '' || setData.userID === '') {
        res.json({
          message: 'All data must be filled!'
        })
        return
      }
      const result = await commentModel.editComment(id, setData)
      res.json(result)
    } catch (err) {
      res.json(err)
    }
  },
  delComment: async (req, res) => {
    try {
      const id = req.params.id
      const result = await commentModel.deleteComment(id)
      res.json(result)
    } catch (err) {
      res.json(err)
    }
  },
  commentByRecipe: async (req, res) => {
    try {
      const id = req.params.id
      const result = await commentModel.commentByRecipe(id)
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
  }
}

module.exports = commentController
