const userModel = require('../models/users.model')

const userController = {

  insert: (req, res) => {
    const { id, name, email, phone, password, images } = req.body
    userModel
      .insertUser(id, name, email, phone, password, images)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  list: (req, res) => {
    userModel
      .selectAll()
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
      .selectDetail(id)
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
      .selectUpdate(id, name, email, phone, password, image)
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
      .selectDestroy(id)
      .then((result) => {
        res.json(result)
      })
      .catch((err) => {
        res.json(err)
      })
  }
}

module.exports = userController
