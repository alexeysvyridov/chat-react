const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
router.post('/', async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!(email && password)) {
            res.status(400).send("All inputs are required!")
        }

        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password, user.password) )) {
            const token = jwt.sign(
                {user_id: user._id, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            )
            user.token = token;
            let {password, ...other} = user._doc    
            res.status(200).json(other)
        }else {
            res.status(400).send("Invalid Credentials")
        }
    } catch (error) {
        console.log(error)
    }
})


module.exports = router;