const multer = require('multer')
const path = require('path')

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
  const multerSingle = multerUpload.single('gambar')
  multerSingle(req, res, (err) => {
    if (err) {
      res.json({
        message: 'error upload file',
        error: err
      })
    } else {
      next()
    }
  })
}

module.exports = upload
