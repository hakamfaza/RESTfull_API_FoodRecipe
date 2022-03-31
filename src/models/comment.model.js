const db = require('../config/db')

const commentModel = {
  insertComment: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO comment (recipe_id, comment_text, user_id) VALUES ($1, $2, $3)', [setData.recipeID, setData.commentText, setData.userID], (err, result) => {
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
  editComment: (id, setData) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE comment SET recipe_id=$2, comment_text=$3, user_id=$4 WHERE id=$1', [id, setData.recipeID, setData.commentText, setData.userID], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  deleteComment: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM comment WHERE id=$1', [id], (err, result) => {
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
