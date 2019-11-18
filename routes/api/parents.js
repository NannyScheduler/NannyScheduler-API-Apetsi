const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const middleware = require('../../middlewares/index.js')

const Parents = require('../../models/Parents')

// @route    GET   api/parents/test
// @desc     Test parents route
// @access   Public
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Parents route works' })
})

// @route    GET   api/parents/
// @desc     Get all parents
// @access   Public
router.get('/', (req, res) => {
  Parents.find().then(parents => {
    if (parents.length === 0) {
      return res.status(404).json({ message: 'No parents found' })
    }
    res.status(200).json(parents)
  }).catch(err => {
    res.status(500).json({ message: `Unable to retrieve parents from the database. ${err.message}` })
  })
})

// @route    GET   api/parents/:id
// @desc     Get parent by id
// @access   Public
router.get('/:id', (req, res) => {
  Parents.findById(req.params.id)
    .then(parent => {
      if (!parent) {
        return res.status(404).json({ message: 'Parent not found' })
      }
      res.status(200).json(parent)
    })
    .catch(err => {
      res.status(500).json({ message: `Unable to get the parent with the given id. ${err.message}` })
    })
})

// @route    POST   api/parents/register
// @desc     Register a parent
// @access   Public
router.post('/register', middleware.verifyUserCred, (req, res) => {
  const newUser = { email: req.body.email, password: req.body.password, username: req.body.username }
  const hash = bcrypt.hashSync(newUser.password, 10)
  newUser.password = hash
  Parents.save(newUser)
    .then(parent => {
      res.status(201).json({ message: 'Parent saved successfully' })
    })
    .catch(err => {
      res.status(500).json({ message: `Unable to save parent to database. ${err.message}` })
    })
})

module.exports = router
