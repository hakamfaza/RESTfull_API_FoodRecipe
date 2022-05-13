const db = require('../config/db')

const commentModel = {
  insertComment: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO comment (id, recipe_id, comment, user_id, date) VALUES ($1, $2, $3, $4, $5)', [setData.id, setData.recipeID, setData.commentText, setData.userID, setData.date], (err, result) => {
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
      db.query('SELECT COUNT(*) AS total FROM comment', (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  getComment: (sortByField, sortByType, getLimitValue, getPageValue) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM comment ORDER BY ${sortByField} ${sortByType} LIMIT ${getLimitValue} OFFSET ${getPageValue}`, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  detailComment: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM comment WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  editComment: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE comment SET comment=$1 WHERE id=$2 AND recipe_id=$3 AND user_id=$4', [setData.comment, setData.idComment, setData.recipeID, setData.userID], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  deleteComment: (id, userID) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM comment WHERE id=$1 AND user_id=$2', [id, userID], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  commentByRecipe: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM comment INNER JOIN recipe ON recipe.id=recipe_id WHERE recipe.id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
}

module.exports = commentModel
