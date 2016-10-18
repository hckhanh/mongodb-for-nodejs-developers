const express = require('express')
const nunjucks = require('nunjucks')
// const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const bodyParser = require('body-parser')

const app = express()

// configure template engine nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express: app
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// MongoClient.connect('mongodb://localhost:27017/video', (err, db) => {
//   assert.equal(null, err)
//   console.log('Successfully connectd to the db')

//   app.get('/', (req, res) => {
//     db.collection('movies').find().toArray((err, movies) => {
//       assert.equal(null, err)
//       res.render('movies.html', { movies: movies })
//     })
//   })

//   app.use((req, res) => {
//     res.sendStatus(404)
//   })

//   const server = app.listen(3000, () => {
//     const port = server.address().port
//     console.log('Server is listening on port ' + port)
//   })
// })

app.get('/', (req, res) => {
  res.render('food-picker.html', {
    fruit: ['Mango', 'Dragon', 'fruit', 'Apple', 'Orange']
  })
})

app.post('/favorite-food', (req, res, next) => {
  if (!req.body) {
    return next(new Error('Wrong fruit data'))
  }

  res.render('favorite-food.html', req.body);
})

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({
      message: err.message,
      stack: err.stack
    })
})

const server = app.listen(3000, () => {
  const port = server.address().port
  console.log('Server is listening on port ' + port)
})
