const bcrypt = require('bcrypt')
const deleteFile = require('../helpers/delete')
const salt = 10
const { success, failed } = require('../helpers/response')

const userModel = require('../models/users.model')

const userController = {

  getUser: async (req, res) => {
    try {
      const { sortField, sortType, page, limit } = req.query
      const sortByField = sortField || 'id'
      const sortByType = sortType || 'ASC'

      // Pagination
      const getPageValue = page ? Number(page) : 1
      const getLimitValue = limit ? Number(limit) : 2
      const getOffsetValue = (getPageValue - 1) * getLimitValue
      const allData = await userModel.allData()
      const totalData = Number(allData.rows[0].total)

      userModel.getUser(sortByField, sortByType, getLimitValue, getOffsetValue)
        .then((result) => {
          const pagination = {
            currentPage: getPageValue,
            dataPerPage: getLimitValue,
            totalPage: Math.ceil(totalData / getLimitValue),
            totalData
          }
          success(res, result.rows, 'succsess', 'Get all users succsess!', pagination)
        })
        .catch((err) => {
          failed(res, err.message, 'failed', 'get all user failed')
        })
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
        password: bcrypt.hashSync(req.body.password, salt),
        image: req.files.image[0].filename,
        id: req.APP_DATA.decode.id
      }

      const check = await userModel.detailUser(setData.id)

      const image = check.rows[0].image

      deleteFile(`./public/${image}`)

      // Validation
      if (setData.name === '' || setData.email === '' || setData.password === '') {
        failed(res, null, 'Failed', 'All data must be filled!')
      }
      userModel.putUser(setData).then((result) => {
        if (result.rowCount > 0) {
          success(res, result, 'Succsess', 'Update data success!')
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
  },
  blockUser: (req, res) => {
    try {
      const id = req.params.id
      const isBlock = req.body.is_active
      const isActive = isBlock ? 1 : 0
      console.log(id, isActive)

      userModel.blockUser(id, isActive).then((result) => {
        if (result.rowCount > 0) {
          success(res, result, 'success', 'succsessfully block user!')
        } else {
          failed(res, null, 'failed', 'Data not found!')
        }
      })
    } catch (err) {
      failed(res, err.message, 'failed', 'failed block user!')
    }
  }
}

module.exports = userController
