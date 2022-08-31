const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// get username and room from URl
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// message from server
socket.on('message', (message) => {
  // console.log(message);
  outputMessage(message);

  // scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // het message text
  const msg = e.target.elements.msg.value;

  // emit message to server
  socket.emit('chatMessage', msg);

  // clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// output msg to DOM
function outputMessage_1(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = ` <p class="meta">${message.username} <span>${message.time}</span></p>
   <p class="text">
      ${message.text}
   </p>`;

  document.querySelector('.chat-messages').appendChild(div);
}

function outputMessage(msg) {
  var divItem = document.createElement('div');
  divItem.classList.add('message');
  divItem.className = 'bg-gray-400 w-fit max-w-auto mx-4 rounded-lg'
  divItem.innerHTML = '<div class="pt-2 px-3"><span class="text-dark text-lg font-bold">' + msg.username + '</span><p class="text-dark font-normal pb-3" id="messages">' + msg.text + '</p></div>'
  document.querySelector('.chat-messages').appendChild(divItem);
  window.scrollTo(0, document.body.scrollHeight);
}

// add room name to DOM
function outputRoomName(room) {
  roomName.innerHTML = room;
}

// add users to DOM
function outputUsers(users) {
  userList.innerHTML = `
      ${users.map((user) => `<span class="pl-6 text-lg">${user.username}</span>`).join('')}
   `;
}
