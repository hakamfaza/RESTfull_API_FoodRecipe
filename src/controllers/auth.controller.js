const validator = require('email-validator')
const bcrypt = require('bcrypt')
const salt = 10

const userModel = require('../models/auth.model')
const { success, failed, successWithtoken } = require('../helpers/response')
const jwtToken = require('../helpers/generateJwtToken')

module.exports = {
  login: async (req, res) => {
    try {
      const setData = {
        email: req.body.email,
        password: req.body.password
      }
      const isEmail = validator.validate(setData.email)
      if (!isEmail) {
        failed(res, null, 'failed', 'wrong email format')
        return
      }
      userModel
        .loginUser(setData)
        .then((result) => {
          // rowCount is number of data
          if (result.rowCount > 0) {
            // Compare password from body
            bcrypt.compare(setData.password, result.rows[0].password)
              .then(async (match) => {
                if (match) {
                  // Token
                  const token = await jwtToken(result.rows[0])
                  successWithtoken(res, token, '12312', 'succsess', 'Login succsess!')
                } else {
                  // When password is wrong
                  failed(res, null, 'failed', 'Email or password is wrong!')
                }
              })
          } else {
            // When username is wrong
            failed(res, null, 'failed', 'Email or password is wrong!')
          }
        }).catch((err) => {
          failed(res, err, 'Failed', 'Failed login')
        })
    } catch (err) {
      failed(res, err, 'Failed', 'Internal server Error')
    }
  },
  createUser: async (req, res) => {
    try {
      const setData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, salt),
        image: req.files.image[0].filename
      }

      // Validation
      if (setData.name === '' || setData.email === '' || setData.phone === '' || setData.password === '') {
        failed(res, null, 'Failed', 'All important data must be filled!')
        return
      }
      const result = await userModel.createUser(setData)
      success(res, result, 'sucsess', 'Create user succsess!')
    } catch (err) {
      failed(res, err, 'Failed', 'Failed crete user')
    }
  }
}
