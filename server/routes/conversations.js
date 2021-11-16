const router = require('express').Router()

const Conversation = require('../models/Conversation')
const verifyToken = require('../middleware/auth')

router.post('/',verifyToken, async (req,res) => {
    const newConversation = new Conversation({
        members:[req.body.senderId, req.body.receiverId]
    })

    try {
        const saveConversation = await newConversation.save();
        res.status(200).json(saveConversation)
    } catch (error) {
      console.log(error)
        res.status(500).json(error)
    }
})

router.get("/:userId",verifyToken, async (req, res) => {
  try {
    const conversation = await Conversation.find({conversations: {
      members:{
        $in: [req.params.userId]
      }
    }})
    res.status(200).json(conversation)
  } catch (error) {
    res.status(500).json(error)
  }
});




module.exports = router;