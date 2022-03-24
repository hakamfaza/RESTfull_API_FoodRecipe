const express = require('express')
const { list, insert, detail, update, destroy } = require('../controllers/users.controller')

const router = express.Router()

router
  .post('/user', insert)
  .get('/user', list)
  .get('/user/:id', detail)
  .put('/user/:id', update)
  .delete('/user/:id', destroy)

module.exports = router
