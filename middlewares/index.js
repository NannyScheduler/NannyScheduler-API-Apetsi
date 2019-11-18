// import parent model
const Parent = require('../models/Parents')
module.exports = { verifyUserCred, checkIfUserAlreadyExists }

function verifyUserCred (req, res, next) {
  const { email, password, username } = req.body
  if (!email || !password || !username) {
    res.status(400).json({ message: 'Username, email and password fields are required' })
  } else {
    next()
  }
}

function checkIfUserAlreadyExists (req, res, next) {
    const {email, username} = req.body
    Parent.find().then(parents => {
        // check if parent already exists in the database
        let parentAlreadyExists = parents.filter(parent => parent.username === username || parent.email === email)
        if (parentAlreadyExists) {
            return res.status(400).json({message: 'A given user already has the username or email you just provided'})
        }
        next()
    }).catch(err => {
        res.status(500).json({message: `Database error. ${err.message}`})
    })
}