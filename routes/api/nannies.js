const express = require('express');
const router = express.Router();

const Nannies = require('../../models/Nannies')

// @route    GET   api/nannies/test
// @desc     Test nannies route
// @access   Public
router.get('/test', (req, res) => {
    res.status(200).json({message: 'Nannies route works'})
})

// @route    GET   api/nannies/
// @desc     Get all nannies 
// @access   Public
router.get('/', (req, res) => {
    Nannies.find().then(nannies => {
        if (nannies.length === 0) {
            return res.status(404).json({message: 'No nannies were found'})
        }
        res.status(200).json(nannies)
    }).catch(err => {
        res.status(500).json({message: `Unable to retrieve nannies from the database. ${err.message}`})
    })
})

module.exports = router