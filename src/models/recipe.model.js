const db = require('../config/db')

const recipeModel = {
  insertRecipe: (id, image, title, ingredients, vidio, date, userid) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO recipe (id, image, title, ingredients, vidio, date, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)', [id, image, title, ingredients, vidio, date, userid], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipe', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  selectDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipe WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  selectUpdate: (id, image, title, ingredients, vidio, date, userid) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE recipe SET image=$2, title=$3, ingredients=$4, vidio=$5, date=$6, user_id=$7 WHERE id=$1', [id, image, title, ingredients, vidio, date, userid], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  selectDelete: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM recipe WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  selectRelasi: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipe INNER JOIN users ON user_id=users.id', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
}

module.exports = recipeModel
