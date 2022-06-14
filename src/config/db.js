require('dotenv').config()
const { Pool } = require('pg')
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT, NODE_ENV } = require('../helpers/env')

const config = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT
}

if (NODE_ENV === 'production') {
  config.ssl = {
    rejectUnauthorized: false
  }
}

const db = new Pool(config)

db.connect((err) => {
  if (err) {
    console.log(err.message)
    process.exit(1)
  }
  console.log('Database berhasil terhubung.')
})

module.exports = db
