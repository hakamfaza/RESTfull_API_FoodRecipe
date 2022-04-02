const express = require('express')
const { getUser, getDetailUser, editUser, delUser } = require('../controllers/users.controller')

const jwtAuth = require('../middleware/jwtAuth')
const { isAdmin, isCostumer } = require('../middleware/authorization')

const router = express.Router()

router
  .get('/user', jwtAuth, isAdmin, getUser) // If condition is met go to get user
  .get('/user/:id', jwtAuth, isCostumer, getDetailUser)
  .put('/user/:id', jwtAuth, isCostumer, editUser)
  .delete('/user/:id', jwtAuth, isAdmin, delUser)

module.exports = router
