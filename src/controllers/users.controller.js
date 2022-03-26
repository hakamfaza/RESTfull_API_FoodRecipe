const userModel = require('../models/users.model')

const userController = {

  createUser: (req, res) => {
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
  getUser: (req, res) => {
    userModel
      .allUser()
      .then((result) => {
        res.json(result.rows)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  getDetailUser: (req, res) => {
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
  editUser: (req, res) => {
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
  delUser: (req, res) => {
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
