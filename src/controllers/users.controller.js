const userModel = require('../models/users.model')

const userController = {

  createUser: async (req, res) => {
    try {
      const setData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        image: req.body.image
      }
      if (setData.name === '' || setData.email === '' || setData.phone === '' || setData.password === '') {
        res.json({
          message: 'All important data must be filled!'
        })
        return
      }
      const result = await userModel.createUser(setData)
      res.json(result)
    } catch (err) {
      res.json(err)
    }
  },
  getUser: async (req, res) => {
    try {
      const data = {
        limit: req.query.limit === undefined ? req.query.limit = 100 : req.query.limit,
        offset: req.query.page === undefined ? req.query.page = 0 : req.query.page
      }
      const result = await userModel.getUser(data)
      if (result.rows.length === 0) {
        res.json({
          message: 'Data not found!'
        })
        return
      }
      const page = data.offset !== 0 ? res.json({ message: `Sekarang page ${data.offset}` }) : result.rows
      res.json(page)
    } catch (err) {
      res.json(err)
    }
  },
  getDetailUser: async (req, res) => {
    try {
      const id = req.params.id
      const result = await userModel.detailUser(id)
      if (result.rows.length === 0) {
        res.json({
          message: 'Data not found!'
        })
        return
      }
      res.json(result.rows[0])
    } catch (err) {
      res.json(err)
    }
  },
  editUser: async (req, res) => {
    try {
      const setData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        image: req.body.image
      }
      if (setData.name === '' || setData.email === '' || setData.password === '') {
        res.json({
          message: 'All important data must be filled!'
        })
        return
      }
      const id = req.params.id
      const result = await userModel.putUser(id, setData)
      res.json(result)
    } catch (err) {
      res.json(err)
    }
  },
  delUser: async (req, res) => {
    try {
      const id = req.params.id
      const result = await userModel.deleteUser(id)
      res.json(result)
    } catch (err) {
      res.json(err)
    }
  }
}

module.exports = userController
