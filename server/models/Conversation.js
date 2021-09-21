const  mongoose =  require('mongoose')

const ConversationSchema = new mongoose.Schema(
    {
        members:Array
    }
)

module.exports = mongoose.model("Conversation", ConversationSchema);
