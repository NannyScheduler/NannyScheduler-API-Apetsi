require('dotenv').config()
const express = require('express')
const cors = require('cors')

// const parents = require('./routes/api/parents')

const app = express()

// express middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// cors middleware
app.use(cors())

// routes middleware
// app.use('/api/parents', parents)

app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to Nanny Scheduler'})
})

const port = process.env.PORT

app.listen(port, () => console.log(`Server is running on port ${port}`))
