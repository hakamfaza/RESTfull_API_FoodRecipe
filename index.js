const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
// const bodyParser = require('body-parser')
const helmet = require('helmet')
const xssClean = require('xss-clean')

const userRoute = require('./src/router/user.router')
const recipeRoute = require('./src/router/recipe.router')
const commentRouter = require('./src/router/comment.router')
const authRouter = require('./src/router/auth.router')

const { SERVER_HOST, SERVER_PORT } = require('./src/helpers/env')

const app = express()

app.use(express.json())
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false
}))
app.use(xssClean())
// app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))

const data = () => {
  try {
    app.use(userRoute)
    app.use(recipeRoute)
    app.use(commentRouter)
    app.use(authRouter)
  } catch (err) {
    console.log(err)
  }
}
data()

dotenv.config()
const host = SERVER_HOST
const port = SERVER_PORT
app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`)
})
