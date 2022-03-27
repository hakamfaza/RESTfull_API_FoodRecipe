const db = require('../config/db')

const commentModel = {
  insertComment: (recipeID, commentText, userID) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO comment (recipe_id, comment_text, user_id) VALUES ($1, $2, $3)', [recipeID, commentText, userID], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  },
  listComment: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM comment', (err, result) => {
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
  updateComment: (id, recipeID, commentText, userID) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE comment SET recipe_id=$2, comment_text=$3, user_id=$4 WHERE id=$1', [id, recipeID, commentText, userID], (err, result) => {
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
  },
  commentList: (offset) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM comment LIMIT 5 OFFSET $1', [offset], (err, result) => {
        if (err) {
          reject(err)
        }
        resolve(result)
      })
    })
  }
}

module.exports = commentModel
