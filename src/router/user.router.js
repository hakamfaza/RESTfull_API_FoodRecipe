const express = require('express')
const { getUser, getDetailUser, editUser, delUser } = require('../controllers/users.controller')

const router = express.Router()
const staticAuth = require('../middleware/staticAuth')

router
  // .post('/user', createUser)
  .get('/user', staticAuth, getUser) // If condition is met go to get user
  .get('/user/:id', getDetailUser)
  .put('/user/:id', editUser)
  .delete('/user/:id', delUser)

module.exports = router
