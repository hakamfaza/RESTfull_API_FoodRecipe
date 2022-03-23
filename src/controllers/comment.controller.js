const commentModel = require('../models/comment.model')

const commentController = {
  insert: (req, res) => {
    const { id, recipeID, commentText, userID } = req.body
    commentModel
      .insertComment(id, recipeID, commentText, userID)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  list: (req, res) => {
    commentModel
      .listComment()
      .then((result) => {
        res.json(result.rows)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  detail: (req, res) => {
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
  update: (req, res) => {
    const id = req.params.id
    const { recipeID, commentText, userID } = req.body
    commentModel
      .updateComment(id, recipeID, commentText, userID)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  destroy: (req, res) => {
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
  relation: (req, res) => {
    commentModel
      .relationCommnet()
      .then((result) => {
        res.json(result.rows)
      })
      .catch((err) => {
        res.json(err)
      })
  }

}

module.exports = commentController
