const { Pool } = require('pg')

const db = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '1arex1ar',
  database: 'db_food_recipe',
  port: 5432
})

module.exports = db
