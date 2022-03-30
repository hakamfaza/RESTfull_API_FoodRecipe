const { success, failed } = require('../helpers/response')
const userModel = require('../models/users.model')

const userController = {

  getUser: async (req, res) => {
    try {
      const data = {
        // Validation use ternary
        limit: req.query.limit ? 100 : req.query.limit,
        offset: req.query.page ? 0 : req.query.page,
        sortByType: req.query.sortType === 'ASC' || req.query.sortType === 'DESC' ? req.query.sortType : 'ASC'
      }
      // const getPageValue = data.offset ? Number(data.offset) : 2
      // const getLimitValue = data.limit ? Number(data.limit) : 1
      // // const offsetValue = (getPageValue - 1) * getLimitValue
      // const allData = await userModel.allData()
      // const totalData = Number(allData.rows[0].total)
      // const result = await userModel.getUser(data)
      // if (result.rows.length === 0) {
      //   res.json({
      //     message: 'Data not found!'
      //   })
      //   return
      // }
      // res.json(result.rows)
      // const pagination = {
      //   currentPage: getPageValue,
      //   dataPerPage: getLimitValue,
      //   totalPage: Math.ceil(totalData / getLimitValue),
      //   totalData
      // }
      const result = await userModel.getUser(data)
      success(res, result.rows, 'succsess', 'Get all users succsess!')
    } catch (err) {
      failed(res, err, 'Failed', 'Failed to display data!')
    }
  },
  getDetailUser: async (req, res) => {
    try {
      const id = req.params.id
      userModel.detailUser(id).then((result) => {
        // rowCount is number of data
        if (result.rowCount > 0) {
          success(res, result.rows[0], 'Sucsess', 'Get detail user succsess!')
        } else {
          failed(res, null, 'Failed', 'Data not found!')
        }
      })
    } catch (err) {
      failed(res, err, 'Failed', 'Failed to display data!')
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
      // Validation
      if (setData.name === '' || setData.email === '' || setData.password === '') {
        failed(res, null, 'Failed', 'All data must be filled!')
      }
      const id = req.params.id
      userModel.putUser(id, setData).then((result) => {
        if (result.rowCount > 0) {
          success(res, result.rows, 'Succsess', 'Update data success!')
        } else {
          failed(res, null, 'Failed', 'Data not found!')
        }
      })
    } catch (err) {
      failed(res, err, 'Failed', 'Failed to update data!')
    }
  },
  delUser: async (req, res) => {
    try {
      const id = req.params.id
      userModel.deleteUser(id).then((result) => {
        if (result.rowCount > 0) {
          success(res, result.row[0], 'Succsess', 'Delete has been successful!')
        } else {
          failed(res, null, 'Failed', 'Data not found!')
        }
      })
    } catch (err) {
      failed(res, err, 'Failed', 'Failed to delete data!')
    }
  }
}

module.exports = userController
