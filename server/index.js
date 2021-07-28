const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)

const {Server} = require('socket.io')
const io = new Server(server)
console.log()
const helloRoute = require('./routes/hello')
app.use('/api/', helloRoute.hello)
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        console.log(`message: ${msg}`)
        io.emit('chat message', msg)
    })
})

server.listen(4000, () => {
    console.log('listening port 4000')
})