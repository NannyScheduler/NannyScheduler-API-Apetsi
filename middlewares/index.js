module.exports = {verifyUserCred}

function verifyUserCred(req, res, next) {
    const {email, password, username} = req.body
    if (!email || !password || !username) {
        res.status(400).json({message: 'Username, email and password fields are required'})
    } else {
        next()
    }
}