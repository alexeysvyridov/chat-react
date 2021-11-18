const User = require('../models/User')

const router = require('express').Router()
const verifyToken = require('../middleware/auth')
// router.get('/', (_, res) => {
//     try {
//         const usersMap = {}
//         User.find({}, (err, users) => {
//            users.forEach(user => {
//                usersMap[user._id] = user
//            }); 
//            res.status(200).json(users)
//         })
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })
router.get('/',verifyToken, async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;

    try {
        const user = userId 
            ? await User.findById(userId) 
            : await User.findOne({username: username})
        const {password, ...other} = user._doc;   
       return res.status(200).json(other) 
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;