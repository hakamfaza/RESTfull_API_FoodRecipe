const db = require('../config/db')

const userModel = {
  insertUser: (id, name, email, phone, password, images) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (id, name, email, phone, password, image) VALUES ($1, $2, $3, $4, $5, $6)', [id, name, email, phone, password, images], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  selectDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  selectUpdate: (id, name, email, phone, password, image) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE users SET name=$2, email=$3, phone=$4, password=$5, image=$6 WHERE id=$1', [id, name, email, phone, password, image], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  selectDestroy: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
}

module.exports = userModel
