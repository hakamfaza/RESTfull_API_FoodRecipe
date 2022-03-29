const db = require('../config/db')

const commentModel = {
  insertComment: (setData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO comment (recipe_id, comment_text, user_id) VALUES ($1, $2, $3)', [setData.recipeID, setData.commentText, setData.userID], (err, result) => {
        if (err) {
          reject(err)
        }
        const newResult = {
          message: 'Succsess create comment!'
        }
        resolve(newResult)
      })
    })
  },
  getComment: (data) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM comment LIMIT $1 OFFSET $2', [data.limit, data.offset], (err, result) => {
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
        const newResult = {
          id: id,
          ...setData
        }
        resolve(newResult)
      })
    })
  },
  deleteComment: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM comment WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        }
        const newResult = {
          message: 'Succsess deleted!'
        }
        resolve(newResult)
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
