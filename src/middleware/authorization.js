const userModel = require('../models/users.model')
const { failed } = require('../helpers/response')

module.exports = {
  isVerify: async (req, res, next) => {
    try {
      const user = await userModel.getUserByEmail(req.body.email)
      console.log(user.rows[0])
      if (!user.rowCount) {
        next()
      } else if (user.rows[0].is_verified) {
        next()
      } else {
        failed(res, null, failed, 'Your email not verified yet!')
      }
    } catch (error) {
      failed(res, error.message, failed, 'internal server error!')
    }
  },
  isAdmin: (req, res, next) => {
    if (req.APP_DATA.tokenDecoded.level === 0) {
      next()
    } else {
      failed(res, null, failed, 'User dont have acces!')
    }
  },
  isCostumer: (req, res, next) => {
    try {
      const decode = req.APP_DATA.tokenDecoded
      if (decode.level === 1) {
        req.APP_DATA = { decode }
        next()
      } else {
        failed(res, null, failed, 'User dont have acces!')
      }
    } catch (error) {
      failed(res, null, failed, 'error server!')
    }
  }
}
