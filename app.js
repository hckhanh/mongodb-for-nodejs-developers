const express = require('express')
const nunjucks = require('nunjucks')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app
})

MongoClient.connect('mongodb://localhost:27017/video', (err, db) => {
  assert.equal(null, err)
  console.log('Successfully connectd to the db')

  app.get('/', (req, res) => {
    db.collection('movies').find().toArray((err, movies) => {
      assert.equal(null, err)
      res.render('movies.html', { movies: movies })
    })
  })

  app.use((req, res) => {
    res.sendStatus(404)
  })

  const server = app.listen(3000, () => {
    const port = server.address().port
    console.log('Server is listening on port ' + port)
  })
})
