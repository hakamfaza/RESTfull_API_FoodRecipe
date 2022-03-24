const commentModel = require('../models/comment.model')

const commentController = {
  insert: (req, res) => {
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
  },
  detailRelation: (req, res) => {
    const id = req.params.id
    commentModel
      .detRelation(id)
      .then((result) => {
        res.json(result.rows)
      })
      .catch((err) => {
        res.json(err)
      })
  }

}

module.exports = commentController
