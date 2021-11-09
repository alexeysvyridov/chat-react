const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const path = require('path') 
const mongoose = require('mongoose')
const conversations = require('./routes/conversations')
const messages = require('./routes/messages')
const posts = require('./routes/posts')
const users = require('./routes/users')
const NEW_CHAT_MESSAGE_EVENT = 'NEW_CHAT_MESSAGE_EVENT';
const io = require('socket.io')(5000, {
    cors:{
        origin:"http://localhost:3000"
    }
})
// const posts = require('./routes/posts')
app.use("assets/images", express.static(path.join(__dirname, "public/assets/images")));
// app.use('/api/posts', posts)
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`listening port ${PORT}`)
})  
let usersArr = [];
const addUser = (userId, socketId) => {
    !usersArr.some((user) =>  user.userId === userId) && users.push({userId, socketId})
}
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("addUser", userId => {
        addUser(userId, socket.id)
        //send all users to client
        io.emit("getUsers", usersArr)
    })
})


app.use('/api/conversations', conversations)
app.use('/api/messages', messages)
app.use('/api/posts', posts)
app.use('/api/users', users)



async function main() {
    const uri = 'mongodb+srv://alex:alex123@cluster0.js2ld.mongodb.net/social'
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to DB was successfully')
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
}
main().catch(console.error)