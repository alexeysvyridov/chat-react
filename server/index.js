const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
 
const {Server} = require('socket.io')
const io = new Server(server)
const helloRoute = require('./routes/hello')
const {MongoClient} = require('mongodb') 

app.use('/api/', helloRoute.hello)


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        console.log(`message: ${msg}`)
        io.emit('chat message', msg)
    })
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
    console.log(`listening port ${PORT}`)
})  

async function main() {
    const uri = 'mongodb+srv://alex:alex123@cluster0.js2ld.mongodb.net/test'
    MongoClient.connect(uri, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to DB was successfully')
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
}
main().catch(console.error)