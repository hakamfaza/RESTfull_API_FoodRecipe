const express = require('express')
const { createComment, getComment, getDetailComment, editComment, delComment, commentByRecipe } = require('../controllers/comment.controller')
const jwtAuth = require('../middleware/jwtAuth')

const { isCostumer, isAdmin } = require('../middleware/authorization')

const router = express.Router()

router
  .post('/comment/:id', jwtAuth, isCostumer, createComment)
  .get('/comment', jwtAuth, isAdmin, getComment)
  .get('/comment/:id', jwtAuth, isAdmin, getDetailComment)
  .put('/comment/:id', jwtAuth, isCostumer, editComment)
  .delete('/comment/:id', jwtAuth, isCostumer, delComment)
  .get('/comment-by-recipe/:id', jwtAuth, isCostumer, commentByRecipe) // Show comments by recipe

module.exports = router
