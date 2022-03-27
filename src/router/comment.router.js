const express = require('express')
const { createComment, getComment, getDetailComment, editComment, delComment, commentByRecipe, listComment } = require('../controllers/comment.controller')

const router = express.Router()

router
  .post('/comment', createComment)
  .get('/comment', getComment)
  .get('/comment/:id', getDetailComment)
  .put('/comment/:id', editComment)
  .delete('/comment/:id', delComment)
  .get('/commentbyRecipe/:id', commentByRecipe)
  .get('/commentList', listComment)

module.exports = router
