let btn = document.querySelector("#mobile-menu-button");
let sidebar = document.querySelector("#sidebar");

btn.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
});

// get username and room
const getRoomUser = document.getElementById('getRoomUser')

// get message from current user
var messages = document.getElementById('messages');
var formMessage = document.getElementById('form-message');
var formRoomUser = document.getElementById('form-room-user');
var input = document.getElementById('input');

formMessage.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat-message', input.value);
    input.value = '';
  }
});

getRoomUser.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('room-created', input.value);
    input.value = '';
  }
});

socket.on('chat-message', (msg) => {
  var divItem = document.createElement('div');
  divItem.className = 'bg-gray-400 w-fit max-w-auto mx-4 rounded-lg'
  divItem.innerHTML = '<div class="pt-2 px-3"><span class="text-dark text-lg font-bold">' + msg + '</span><p class="text-dark font-normal pb-3" id="messages">' + msg + '</p></div>'
  messages.appendChild(divItem);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('room-created', (room) => {
  var divItem = document.createElement('div');
  divItem.className = 'pb-6'
  divItem.innerHTML = '<span class="pl-6 text-lg">' + room + '</span>'
  getRoomUser.appendChild(divItem)
})