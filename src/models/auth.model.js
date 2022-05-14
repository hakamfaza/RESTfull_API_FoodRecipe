const db = require('../config/db')

const authModel = {
  register: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (id, name, email, phone, password, image, level, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [setData.id, setData.name, setData.email, setData.phone, setData.password, setData.image, setData.level, setData.isActive], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  updateToken: (id, token) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE users SET token=$2 WHERE id=$1', [id, token], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  checkEmailToken: (token) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE token=$1', [token], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  activation: (id) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE users SET is_verified=true WHERE id=$1', [id], (err, result) => {
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
  },
  resetPassword: (id, password) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE users SET password=$1 WHERE id=$2', [password, id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
}

module.exports = authModel
