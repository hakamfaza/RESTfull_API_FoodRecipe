const db = require('../config/db')

const userModel = {
  insertUser: (name, email, phone, password, image) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (name, email, phone, password, image) VALUES ($1, $2, $3, $4, $5)', [name, email, phone, password, image], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  allUser: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  detailUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  updateUser: (id, name, email, phone, password, image) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE users SET name=$2, email=$3, phone=$4, password=$5, image=$6 WHERE id=$1', [id, name, email, phone, password, image], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  destroyUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  listUser: (offset) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users LIMIT 5 OFFSET $1', [offset], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
}

module.exports = userModel
