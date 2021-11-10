const route = require('express').Router()
const Registration = require('../models/Registration');

const User = require('../models/User')
route.post('/', async (req,res) => {
    try {
        const {username, email, password} = req.body;
        if(!(username && email && password)) {
            res.statusCode(400).send("Inputs are required");
        }

        const hasAlready = await User.findOne({email})
        if(hasAlready) {
            return res.statusCode(409).send("That user already exist")
        }
    } catch (error) {
        console.log(error)
        res.statusCode(400).json(error)
    }
})
module.exports =  route