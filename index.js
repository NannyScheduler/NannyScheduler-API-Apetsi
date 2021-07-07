require('dotenv').config()
const express = require('express')
const cors = require('cors')

const parents = require('./routes/api/parents')
const nannies = require('./routes/api/nannies')

const app = express()

// express middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// cors middleware
app.use(cors())

// routes middleware
app.use('/api/parents', parents)
app.use('/api/nannies', nannies)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Nanny Scheduler' })
})

module.exports = app
