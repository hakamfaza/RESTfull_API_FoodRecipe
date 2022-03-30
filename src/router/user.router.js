const express = require('express')
const { getUser, getDetailUser, editUser, delUser } = require('../controllers/users.controller')

const router = express.Router()
const staticAuth = require('../middleware/staticAuth')

router
  // .post('/user', createUser)
  // If condition is met go to get user
  .get('/user', staticAuth, getUser)
  .get('/user/:id', getDetailUser)
  .put('/user/:id', editUser)
  .delete('/user/:id', delUser)

module.exports = router
