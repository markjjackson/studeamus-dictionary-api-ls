// ** Import dependencies **
const express = require('express')
const { MongoClient } = require('mongodb')
const { constructMongoUri } = require('./util/db')

// ** Import environment variables **
require('dotenv').config()
const { env } = process

// ** Create express app **
const app = express()

// ** Middleware **

// Configure CORS is desired (included in .env)
if (env.APP_CORS_ORIGIN && env.APP_CORS_HEADERS) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', env.APP_CORS_ORIGIN)
    res.header("Access-Control-Allow-Headers", env.APP_CORS_HEADERS)
    next()
  })
}

// ** Routes **
app.get('/', (req, res) => {
  res.send('Studeamus dictionary app API')
})

app.get('/word', (req, res) => {
  const { query } = req
  const searchTerm = query.q
  let searchQuery = searchTerm.length < 2 ? '' : new RegExp(`^${searchTerm}.*`) 
  switch(searchTerm) {
    case 'a':
      searchQuery = new RegExp(`^a[1-9]$`) 
      break;
    case 'e':
    searchQuery = new RegExp(`^e[1-9]$`) 
      break;
  }

  MongoClient.connect(constructMongoUri(env), (err, db) => {
    db.collection('ls')
      .find({ key: searchQuery })
      .toArray((err, items) => {
        err ? console.log(err) : res.send(items)
        db.close()
      })
  })
})

// ** Run app **
app.listen(env.APP_PORT, () => {
  console.log(`App listening on port ${env.APP_PORT}`)
})
