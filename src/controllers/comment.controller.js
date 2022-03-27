const commentModel = require('../models/comment.model')

const commentController = {
  createComment: (req, res) => {
    const recipeID = req.body.recipe_id
    const commentText = req.body.comment_text
    const userID = req.body.user_id

    commentModel
      .insertComment(recipeID, commentText, userID)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  getComment: (req, res) => {
    commentModel
      .listComment()
      .then((result) => {
        res.json(result.rows)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  getDetailComment: (req, res) => {
    const id = req.params.id
    commentModel
      .detailComment(id)
      .then((result) => {
        res.json(result.rows[0])
      })
      .catch((err) => {
        res.json(err)
      })
  },
  editComment: (req, res) => {
    const id = req.params.id
    const recipeID = req.body.recipe_id
    const commentText = req.body.comment_text
    const userID = req.body.user_id

    commentModel
      .updateComment(id, recipeID, commentText, userID)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  delComment: (req, res) => {
    const id = req.params.id
    commentModel
      .deleteComment(id)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  commentByRecipe: (req, res) => {
    const id = req.params.id
    commentModel
      .commentByRecipe(id)
      .then((result) => {
        res.json(result.rows)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  listComment: async (req, res) => {
    try {
      const offset = req.query.offset
      const result = await commentModel.listComment(offset)
      res.json(result.rows)
    } catch (err) {
      res.json(err)
    }
  }

}

module.exports = commentController
