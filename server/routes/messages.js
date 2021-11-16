const router = require('express').Router()

const Message = require('../models/Message')
const verifyToken = require('../middleware/auth')
router.post('/',verifyToken, async (req, res) => {
    const newMessage = new Message(req.body)
    try {
        const savedMessage  = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/:conversationId", verifyToken, async (req, res) => {
  try {
    const allMessages = await Message.find({
      conversationId: req.params.conversationId
    })
    res.status(200).json(allMessages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;