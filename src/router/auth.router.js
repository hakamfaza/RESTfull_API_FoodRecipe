const express = require('express')
const { login, register, activation } = require('../controllers/auth.controller')
const { isVerify } = require('../middleware/authorization')
const upload = require('../middleware/upload')

const router = express.Router()

router
  .post('/register', upload, register)
  .get('/activation/:token', isVerify, activation)
  .post('/login', isVerify, login)

module.exports = router
