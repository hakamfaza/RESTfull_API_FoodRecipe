const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const xssClean = require('xss-clean')

const userRoute = require('./src/router/user.router')
const recipeRoute = require('./src/router/recipe.router')
const commentRouter = require('./src/router/comment.router')

const app = express()
app.use(xssClean())
app.use(helmet())
app.use(bodyParser.json())

app.use(userRoute, recipeRoute, commentRouter)

app.listen(3000, () => {
  console.log('Server running on PORT 3000')
})
