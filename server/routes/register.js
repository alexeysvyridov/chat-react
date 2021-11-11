const router = require("express").Router();
const bcrypt = require('bcrypt')
const User = require('../models/User')


const jwt = require('jsonwebtoken')
router.post('/', async (req,res) => {
    const {username, email, password} = req.body;
    try {
        if(!(username && email && password)) {
            res.status(400).send("Inputs are required");
        }
        
        const hasAlready = await User.findOne({email})
        if(hasAlready) {
            console.log(hasAlready)
            return res.status(409).send("That user already exist")
        }
       const encryptedPassword = await bcrypt.hash(password,10)

       const user = await User.create({
            username,
            email:email.toLowerCase(),
            password: encryptedPassword,
            isAdmin: false,
            img:""
       })

       const token = jwt.sign(
           {user_id: user._id, email},
           process.env.TOKEN_KEY,
           {
            expiresIn: "2h"
           }
       )
       user.token = token;
    //    console.log(registerUser)    
       res.status(201).json(user)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})
module.exports =  router