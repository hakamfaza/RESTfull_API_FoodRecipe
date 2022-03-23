const express = require('express')
const { list, insert, detail, update, destroy } = require('../controllers/users.controller')

const router = express.Router()

router
  .post('/insert', insert)
  .get('/user', list)
  .get('/user/:id', detail)
  .put('/update/:id', update)
  .delete('/delete/:id', destroy)

module.exports = router
