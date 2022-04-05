const express = require('express')
const { getUser, getDetailUser, editUser, delUser, blockUser } = require('../controllers/users.controller')

const jwtAuth = require('../middleware/jwtAuth')
const { isAdmin, isCostumer } = require('../middleware/authorization')
const upload = require('../middleware/upload')

const router = express.Router()

router
  .get('/user', jwtAuth, isAdmin, getUser) // If condition is met go to get user
  .get('/user/:id', jwtAuth, getDetailUser)
  .put('/user', jwtAuth, isCostumer, upload, editUser)
  .delete('/user', jwtAuth, isCostumer, delUser)
  .put('/block-user/:id', jwtAuth, isAdmin, blockUser)

module.exports = router
