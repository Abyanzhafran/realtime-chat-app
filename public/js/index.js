let btn = document.querySelector("#mobile-menu-button");
let sidebar = document.querySelector("#sidebar");

btn.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
});

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function (msg) {
  var divItem = document.createElement('div');
  divItem.className = 'bg-gray-400 w-fit max-w-auto mx-4 rounded-lg'
  divItem.innerHTML = '<div class="pt-2 px-3"><span class="text-dark text-lg font-bold">' + msg + '</span><p class="text-dark font-normal pb-3" id="messages">' + msg + '</p></div>'
  messages.appendChild(divItem);
  window.scrollTo(0, document.body.scrollHeight);
});