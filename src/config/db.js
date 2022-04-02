require('dotenv').config()
const { Pool } = require('pg')
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } = require('../helpers/env')

const db = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT
})

module.exports = db
