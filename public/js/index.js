let btn = document.querySelector("#mobile-menu-button");
let sidebar = document.querySelector("#sidebar");

btn.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
});