require('dotenv').config()
const express = require('express')
const Person = require('./models/persons')
var morgan = require('morgan')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('data', (req) => req)

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))


const createResponse = () => {
  const result = Person.find({})
    .then(persons =>
      `<div>
            <p>Phonebook has info for ${persons.length} people </p>
            <p>${Date()} </p>
        </div>`)
  return result
}

app.get('/api/persons', (request, response, next) => {
  const body = request.body
  const data = JSON.stringify(body)
  morgan.token('data', function () { return data })
  Person.find({}).then(persons => {
    if (persons) {
      response.json(persons)
    } else {
      console.log('Can\'t fetch persons')
      next('Can\'t fetch persons')
    }})
})

app.get('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const data = JSON.stringify(body)
  morgan.token('data', function () {
    return data })
  Person.findById(request.params.id)
    .then(result => {
      if (result) {
        response.json(result)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)})
})

app.get('/info', (request, response, next) => {
  const body = request.body
  const data = JSON.stringify(body)
  morgan.token('data', function () {
    return data })

  createResponse()
    .then(result => {
      if (result) {
        response.send(result)
      } else {
        next('Info can\'t be found')
      }})
})

app.delete('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const data = JSON.stringify(body)
  morgan.token('data', function () {
    return data })

  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      if (result) {
        response.status(204).end()
      } else
        response.status(404).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const data = JSON.stringify(body)
  morgan.token('data', function () {
    return data })

  const name = body.name
  const number = body.number

  if (name === '' || number === '') {
    next('Name or number missing')
  } else {
    const person = new Person ({
      name: name,
      number: number
    })

    person.save().then(() => {
      response.json(person)
    })
      .catch(error => next(error))
  }})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const data = JSON.stringify(body)
  morgan.token('data', function () {
    return data })

  const opts = { runValidators: true }

  Person.findByIdAndUpdate(request.params.id, { number: body.number }, opts)
    .then(result => {
      if (result) {
        response.status(204).end()
      } else
        response.status(404).end()
    })
    .catch(error => next(error))
})

// Express virheidenkäsittelijä. Näiden funktioilla on neljä parametria.
// Virheidenkäsittellijämiddleware tulee rekisteröidä muiden middlewarejen ja routejen jälkeen.
const errorHandler = (error, request, response, next) => {
  console.log('In errorHandler')

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error === 'Name or number missing') {
    return response.status(400).send({ error: 'name or number missing' })
  }

  if (error === 'Info can\'t be found') {
    return response.status(400).send({ error: 'Info can\'t be found' })
  }

  if (error === 'Can\'t fetch persons') {
    return response.status(400).send({ error: 'Can\'t fetch persons' })
  }

  if (error.name === 'ValidationError') {
    console.log('in right error handler')
    return response.status(400).send({ error: error.message })
  }


  next(error)
}

// tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})