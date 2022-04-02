const { failed } = require('../helpers/response')
module.exports = {
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
