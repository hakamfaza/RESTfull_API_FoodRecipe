const express = require('express')
const { createComment, getComment, getDetailComment, editeComment, delComment, commentByRecipe } = require('../controllers/comment.controller')

const router = express.Router()

router
  .post('/comment', createComment)
  .get('/comment', getComment)
  .get('/comment/:id', getDetailComment)
  .put('/comment/:id', editeComment)
  .delete('/comment/:id', delComment)
  .get('/commentbyRecipe/:id', commentByRecipe)

module.exports = router
