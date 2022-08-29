const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3001;

var rooms = {}
// var users = []

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/room', (req, res) => {
  // users.push(req.body.username)
  rooms[req.body.room] = { users: {} }
  if (req.body.username !== '' && req.body.room !== '') {
    res.redirect(req.body.room)
    io.emit('room-created', req.body.room)
  }
  res.redirect('/')
})

app.get('/chat', (req, res) => {
  res.redirect('/')
})

app.get('/:room', (req, res) => {
  if (rooms[req.params.room] == '') {
    return res.redirect('/')
  }
  res.render('chat')
  console.log(rooms)
})

io.on('connection', (socket) => {
  socket.on('chat-message', msg => {
    io.emit('chat-message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});