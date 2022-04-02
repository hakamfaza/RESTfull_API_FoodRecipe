const db = require('../config/db')

const recipeModel = {
  insertRecipe: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO recipe (image, title, ingredients, vidio, date, user_id, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7)', [setData.image, setData.title, setData.ingredients, setData.vidio, setData.date, setData.userID, setData.isActive], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  allData: () => {
    return new Promise((resolve, reject) => {
      // Count is total data
      db.query('SELECT COUNT(*) AS total FROM recipe WHERE is_active = 1', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  getRecipe: (getSearch, sortByField, sortByType, getLimitValue, getOffsetValue) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM recipe WHERE title ILIKE '%${getSearch}%' AND is_active = 1 ORDER BY ${sortByField} ${sortByType} LIMIT ${getLimitValue} OFFSET ${getOffsetValue}`, (err, result) => {
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
  editRecipe: (id, setData) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE recipe SET image=$2, title=$3, ingredients=$4, vidio=$5, date=$6, user_id=$7 WHERE id=$1 AND $8', [id, setData.image, setData.title, setData.ingredients, setData.vidio, setData.date, setData.userID, setData.userID], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  deleteRecipe: (id, userID) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM recipe WHERE id=$1 AND user_id=$2', [id, userID], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  getAllRecipeByUser: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipe INNER JOIN users ON user_id=users.id', (err, result) => {
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
  latesRecipe: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipe ORDER BY date DESC LIMIT 5', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  blockRecipe: (id, getBlcok) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE recipe SET is_active=$1 WHERE id=$2', [getBlcok, id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
}

module.exports = recipeModel
