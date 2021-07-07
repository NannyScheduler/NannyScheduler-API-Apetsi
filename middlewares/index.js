const jwt = require('jsonwebtoken')

// import parent model
const Parent = require('../models/Parents')
module.exports = { verifyUserCred, checkIfUserAlreadyExists, isAuthenticated }

function verifyUserCred (req, res, next) {
  const { email, password, username } = req.body
  if (!email || !password || !username) {
    res.status(400).json({ message: 'Username, email and password fields are required' })
  } else {
    next()
  }
}

async function checkIfUserAlreadyExists (req, res, next) {
  const { email, username } = req.body
  const result = await Parent.find()
  const parentAlreadyExist = result.filter(parent => parent.username === username || parent.email === email)
  if (parentAlreadyExist.length > 0) {
    return res.status(400).json({ message: 'A given parent with the username or email already exists' })
  }
  next()
}

function isAuthenticated (req, res, next) {
  const token = req.headers.authorization
  console.log(token)
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json(err)
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
    res.status(400).json({ message: 'No credentials provided' })
  }
};
