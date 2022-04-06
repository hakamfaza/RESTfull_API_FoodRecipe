const fs = require('fs')

const deleteFile = async (filePath) => {
  try {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        throw new Error(err.message)
      }
      fs.unlink(filePath, (err) => {
        if (err) {
          throw new Error(err.message)
        }
      })
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = deleteFile
