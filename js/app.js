const screens = document.querySelectorAll(".screen");
const hearts = document.querySelector(".hearts");
const noButton = document.getElementById("noButton");
const buttonArea = document.getElementById("buttonArea");

function showScreen(id) {
  screens.forEach(screen => screen.classList.toggle("active", screen.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => showScreen(button.dataset.next));
});

function moveNoButton() {
  const area = buttonArea.getBoundingClientRect();
  const maxX = Math.max(0, area.width - noButton.offsetWidth);
  const maxY = Math.max(0, area.height - noButton.offsetHeight);
  noButton.style.position = "absolute";
  noButton.style.left = `${Math.random() * maxX}px`;
  noButton.style.top = `${Math.random() * maxY}px`;
}

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("touchstart", event => {
  event.preventDefault();
  moveNoButton();
});

document.getElementById("yesButton").addEventListener("click", () => {
  burstHearts();
  showScreen("yesScreen");
});

document.getElementById("againButton").addEventListener("click", () => {
  noButton.style.position = "relative";
  noButton.style.left = "";
  noButton.style.top = "";
  showScreen("welcomeScreen");
});

function createHeart() {
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = ["❤️", "💗", "💕", "💖", "💘"][Math.floor(Math.random() * 5)];
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${14 + Math.random() * 25}px`;
  heart.style.animationDuration = `${5 + Math.random() * 6}s`;
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 12000);
}

function burstHearts() {
  for (let i = 0; i < 35; i++) {
    setTimeout(createHeart, i * 45);
  }
}

setInterval(createHeart, 650);
