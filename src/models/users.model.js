const db = require('../config/db')

const userModel = {
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
  allData: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) AS total FROM users', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  getUser: (data) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users ORDER BY $1 LIMIT $2 OFFSET $3', [data.sortByField, data.limit, data.offset], (err, result) => {
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
  putUser: (id, setData) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE users SET name=$2, email=$3, phone=$4, password=$5, image=$6 WHERE id=$1', [id, setData.name, setData.email, setData.phone, setData.password, setData.image], (err, result) => {
        if (err) {
          reject(err)
        }
        const newResult = {
          id: id,
          ...setData
        }
        resolve(newResult)
      })
    })
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        }
        const newResult = {
          id: id,
          message: 'Succsess deleted!'
        }
        resolve(newResult)
      })
    })
  }
}

module.exports = userModel
