const express = require('express')
const { createUser, getUser, getDetailUser, editUser, delUser } = require('../controllers/users.controller')

const router = express.Router()

router
  .post('/user', createUser)
  .get('/user', getUser)
  .get('/user/:id', getDetailUser)
  .put('/user/:id', editUser)
  .delete('/user/:id', delUser)

module.exports = router
