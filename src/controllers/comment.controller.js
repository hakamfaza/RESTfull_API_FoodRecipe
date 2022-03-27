const commentModel = require('../models/comment.model')

const commentController = {
  createComment: async (req, res) => {
    try {
      const recipeID = req.body.recipe_id
      const commentText = req.body.comment_text
      const userID = req.body.user_id
      const result = await commentModel.insertComment(recipeID, commentText, userID)
      res.json(result)
    } catch (err) {
      res.json(err)
    }
  },
  getComment: async (req, res) => {
    try {
      const result = await commentModel.listComment()
      res.json(result.rows)
    } catch (err) {
      res.json(err)
    }
  },
  getDetailComment: async (req, res) => {
    try {
      const id = req.params.id
      const result = await commentModel.detailComment(id)
      res.json(result.rows[0])
    } catch (err) {
      res.json(err)
    }
  },
  editComment: async (req, res) => {
    try {
      const id = req.params.id
      const recipeID = req.body.recipe_id
      const commentText = req.body.comment_text
      const userID = req.body.user_id
      const result = await commentModel.updateComment(id, recipeID, commentText, userID)
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
      res.json(result.rows)
    } catch (err) {
      res.json(err)
    }
  },
  listComment: async (req, res) => {
    try {
      const offset = req.query.offset
      const result = await commentModel.commentList(offset)
      res.json(result.rows)
    } catch (err) {
      res.json(err)
    }
  }

}

module.exports = commentController
