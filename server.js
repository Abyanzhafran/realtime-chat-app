const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3001;

var users = {}
var rooms = {}

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/chat', (req, res) => {
  users = req.body.username
  rooms = req.body.room
  if (users !== '' || rooms !== '') {
    res.redirect('/chat')
  }
  res.redirect('/')
})

app.get('/chat', (req, res) => {
  if (users == '' || rooms == '') {
    res.redirect('/')
  }
  res.render('chat')
})

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});