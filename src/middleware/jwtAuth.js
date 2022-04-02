const { JWT_SECRET } = require('../helpers/env')
const jwt = require('jsonwebtoken')
const { failed } = require('../helpers/response')

module.exports = (req, res, next) => {
  try {
    const { token } = req.headers
    const decoded = jwt.verify(token, JWT_SECRET)
    // console.log(decoded)
    req.APP_DATA = {
      tokenDecoded: decoded
    }
    next()
  } catch (err) {
    failed(res, err, 'Failed', 'Invalid token')
  }
  // const { token } = req.headers
  // jwt.verify(token, JWT_SECRET, (err, docoded) => {
  //   if (err) {
  //     failed(res, err.message, 'Failed', 'Invalid token!')
  //   } else {
  //     next()
  //   }
  // })
}
