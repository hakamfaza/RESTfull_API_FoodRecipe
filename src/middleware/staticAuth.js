const { failed } = require('../helpers/response')

const auth = (req, res, next) => {
  const token = req.headers.token
  if (token && token === '12312') {
    // Go to router
    next()
  } else {
    failed(res, null, failed, 'invalid token')
  }
}

module.exports = auth
