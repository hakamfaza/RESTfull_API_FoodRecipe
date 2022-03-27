const db = require('../config/db')

const recipeModel = {
  insertRecipe: (image, title, ingredients, vidio, date, userID) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO recipe (image, title, ingredients, vidio, date, user_id) VALUES ($1, $2, $3, $4, $5, $6)', [image, title, ingredients, vidio, date, userID], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  allRecipe: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipe', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  detailRecipe: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipe WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  updateRecipe: (id, image, title, ingredients, vidio, date, userID) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE recipe SET image=$2, title=$3, ingredients=$4, vidio=$5, date=$6, user_id=$7 WHERE id=$1', [id, image, title, ingredients, vidio, date, userID], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  deleteRecipe: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM recipe WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },

  recipeByUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipe INNER JOIN users ON user_id=users.id WHERE users.id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  searchRecipe: (title) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT image, title, ingredients, vidio, date FROM recipe WHERE title ILIKE $1||\'%\'', [title], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  latesRecipe: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipe ORDER BY date ASC LIMIT 5', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  pageRecipe: (offset) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipe LIMIT 5 OFFSET $1', [offset], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }

}

module.exports = recipeModel
