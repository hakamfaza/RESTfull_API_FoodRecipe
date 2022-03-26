const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
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

app.use(cors())

const data = () => {
  try {
    app.use(userRoute)
    app.use(recipeRoute)
    app.use(commentRouter)
  } catch (err) {
    console.log(err)
  }
}
data()

// app.listen(3000, () => {
//   console.log('Server running on PORT 3000')
// })
dotenv.config()
const host = process.env.SERVER_HOST
const port = process.env.SERVER_PORT
app.listen(port, host, () => {
  console.log(`Your port is ${host}`)
  console.log(`Your port is ${port}`)
})
