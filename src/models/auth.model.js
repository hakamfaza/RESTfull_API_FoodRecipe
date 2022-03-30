const db = require('../config/db')

const authModel = {
  createUser: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (name, email, phone, password, image) VALUES ($1, $2, $3, $4, $5)', [setData.name, setData.email, setData.phone, setData.password, setData.image], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  loginUser: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email=$1', [setData.email], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
}

module.exports = authModel
