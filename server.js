const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3001;

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/chat', (req, res) => {
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