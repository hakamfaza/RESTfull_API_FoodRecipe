const express = require('express')
const { getUser, getDetailUser, editUser, delUser } = require('../controllers/users.controller')

const router = express.Router()
// const staticAuth = require('../middleware/staticAuth')
const jwtAuth = require('../middleware/jwtAuth')
const { isAdmin, isCostumer } = require('../middleware/authorization')

router
  // .post('/user', createUser)
  .get('/user', jwtAuth, isAdmin, getUser) // If condition is met go to get user
  .get('/user/:id', isCostumer, getDetailUser)
  .put('/user/:id', editUser)
  .delete('/user/:id', delUser)

module.exports = router
