const multer = require('multer')
const path = require('path')

const { failed } = require('../helpers/response')

// Management file
const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public')
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      const filename = `${Date.now()}${ext}`
      cb(null, filename)
    }
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext === '.jpg' || ext === '.png') {
      cb(null, true)
    } else {
      const error = {
        message: 'file must be jpg or png'
      }
      cb(error, false)
    }
  }
})
// Middelware
const upload = (req, res, next) => {
  const multerFields = multerUpload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'vidio', maxCount: 1 }
  ])
  multerFields(req, res, (err) => {
    if (err) {
      failed(res, err.message, 'failed', 'Error Upload file!'
      )
    } else {
      next()
    }
  })
}

module.exports = upload
