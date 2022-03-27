const userModel = require('../models/users.model')

const userController = {

  createUser: async (req, res) => {
    try {
      const { name, email, phone, password, image } = req.body
      const result = await userModel.insertUser(name, email, phone, password, image)
      res.json(result)
    } catch (err) {
      res.json(err)
    }
  },
  getUser: async (req, res) => {
    try {
      const result = await userModel.allUser()
      res.json(result.rows)
    } catch (err) {
      res.json(err)
    }
  },
  getDetailUser: async (req, res) => {
    try {
      const id = req.params.id
      const result = await userModel.detailUser(id)
      res.json(result.rows[0])
    } catch (err) {
      res.json(err)
    }
  },
  editUser: async (req, res) => {
    try {
      const id = req.params.id
      const { name, email, phone, password, image } = req.body
      const result = await userModel.updateUser(id, name, email, phone, password, image)
      res.json(result)
    } catch (err) {
      res.json(err)
    }
  },
  delUser: async (req, res) => {
    try {
      const id = req.params.id
      const result = await userModel.destroyUser(id)
      res.json(result)
    } catch (err) {
      res.json(err)
    }
  },
  getUserList: async (req, res) => {
    try {
      const offset = req.query.page
      const result = await userModel.listUser(offset)
      res.json(result.rows)
    } catch (err) {
      res.json(err)
    }
  }
}

module.exports = userController
