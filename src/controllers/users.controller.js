const userModel = require('../models/users.model')

const userController = {

  insert: (req, res) => {
    const { name, email, phone, password, image } = req.body
    userModel
      .insertUser(name, email, phone, password, image)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  list: (req, res) => {
    userModel
      .allUser()
      .then((result) => {
        res.json(result.rows)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  detail: (req, res) => {
    const id = req.params.id
    userModel
      .detailUser(id)
      .then((result) => {
        res.json(result.rows[0])
      })
      .catch((err) => {
        res.json(err)
      })
  },
  update: (req, res) => {
    const id = req.params.id
    const { name, email, phone, password, image } = req.body
    userModel
      .updateUser(id, name, email, phone, password, image)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  destroy: (req, res) => {
    const id = req.params.id
    userModel
      .destroyUser(id)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  }
}

module.exports = userController
