const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const middleware = require('../../middlewares/index')

const Nannies = require('../../models/Nannies')

// @route    GET   api/nannies/test
// @desc     Test nannies route
// @access   Public
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Nannies route works' })
})

// @route    GET   api/nannies/
// @desc     Get all nannies
// @access   Public
router.get('/', (req, res) => {
  Nannies.find().then(nannies => {
    if (nannies.length === 0) {
      return res.status(404).json({ message: 'No nannies were found' })
    }
    res.status(200).json(nannies)
  }).catch(err => {
    res.status(500).json({ message: `Unable to retrieve nannies from the database. ${err.message}` })
  })
})

router.get('/:id', (req, res) => {
  Nannies.findById(req.params.id).then(nanny => {
    if (!nanny) {
      return res.status(404).json({ message: 'No nanny with the given id was found' })
    }
    res.status(200).json(nanny)
  }).catch(err => {
    res.status(500).json({ message: `Unable to retrieve the given user. ${err.message}` })
  })
})

// @route    POST   api/nannies/register
// @desc     Register a nanny
// @access   Public
router.post('/register', [middleware.verifyUserCred], (req, res) => {
  const newUser = { email: req.body.email, password: req.body.password, username: req.body.username }
  const hash = bcrypt.hashSync(newUser.password, 10)
  newUser.password = hash
  Nannies.save(newUser)
    .then(nanny => {
      res.status(201).json({ message: 'Nanny saved successfully' })
    })
    .catch(err => {
      res.status(500).json({ message: `Unable to save nanny to database. ${err.message}` })
    })
})

// @route    POST   api/nannies/:id/addprofile
// @desc     Create a nanny profile
// @access   Public
router.post('/:id/addprofile', (req, res) => {

})

// @route    DELETE   api/nannies/:id
// @desc     Delete a nanny from the db
// @access   Public
router.delete('/:id', (req, res) => {
  Nannies.findById(req.params.id).then(nanny => {
    if (nanny) {
      Nannies.remove(req.params.id).then(nanny => {
        res.status(200).json({ message: 'Nanny deleted successfully' })
      }).catch(err => {
        res.status(500).json({ message: `Unable to delete nanny. ${err.message}` })
      })
    } else {
      res.status(404).json({ message: 'Nanny with the given id was not found' })
    }
  })
})

module.exports = router
