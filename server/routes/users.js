const User = require('../models/User')

const router = require('express').Router()

router.get('/', (_, res) => {
    try {
        const usersMap = {}
        User.find({}, (err, users) => {
           users.forEach(user => {
               usersMap[user._id] = user
           }); 
           res.status(200).json(users)
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;