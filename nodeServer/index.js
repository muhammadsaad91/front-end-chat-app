const io = require("socket.io")(8000, {
    cors: {
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });
var cors = require('cors')
var app = require('express')();
// app.use(cors())
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
  app.use(cors(corsOpts));

const users = {}

io.on('connection', socket => {
    socket.on('new-user', name => {
        // console.log("New User Joined:: ", name)
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })

    socket.on('send-chat-message', message => {
        socket.broadcast.emit('recieved', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
}
)



