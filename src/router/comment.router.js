const express = require('express')
const { createComment, getComment, getDetailComment, editComment, delComment, commentByRecipe } = require('../controllers/comment.controller')

const router = express.Router()

router
  .post('/comment', createComment)
  .get('/comment', getComment)
  .get('/comment/:id', getDetailComment)
  .put('/comment/:id', editComment)
  .delete('/comment/:id', delComment)
  .get('/comment-by-recipe/:id', commentByRecipe)

module.exports = router
