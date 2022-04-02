const express = require('express')
const { createComment, getComment, getDetailComment, editComment, delComment, commentByRecipe } = require('../controllers/comment.controller')
const jwtAuth = require('../middleware/jwtAuth')

const router = express.Router()

router
  .post('/comment', jwtAuth, createComment)
  .get('/comment', jwtAuth, getComment)
  .get('/comment/:id', jwtAuth, getDetailComment)
  .put('/comment/:id', jwtAuth, editComment)
  .delete('/comment/:id', jwtAuth, delComment)
  .get('/comment-by-recipe/:id', commentByRecipe) // Show comments by recipe

module.exports = router
