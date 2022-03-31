const express = require('express')
const { createUser, login } = require('../controllers/auth.controller')
const upload = require('../middleware/upload')

const router = express.Router()

router
  .post('/register', upload, createUser)
  .post('/login', login)

module.exports = router
