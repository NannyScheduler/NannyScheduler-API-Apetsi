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

async function  checkIfUserAlreadyExists (req, res, next) {
    const {email, username} = req.body
    const result = await Parent.find()
    const parentAlreadyExist = result.filter(parent => parent.username == username || parent.email === email)
    if (parentAlreadyExist.length > 0) {
        return res.status(400).json({message: `A given parent with the username or email already exists`})
    }
    next()
}