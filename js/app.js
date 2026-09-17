const screens = document.querySelectorAll(".screen");
const nextButtons = document.querySelectorAll("[data-next]");
const noButton = document.getElementById("noButton");
const buttonArea = document.getElementById("buttonArea");
const yesButton = document.getElementById("yesButton");
const againButton = document.getElementById("againButton");
const hintText = document.getElementById("hintText");
const loveCounter = document.getElementById("loveCounter");
const typingText = document.getElementById("typingText");
const loadingScreen = document.getElementById("loadingScreen");
const musicButton = document.getElementById("musicButton");
const loveMusic = document.getElementById("loveMusic");

let noClickCount = 0;
let musicStarted = false;

function showScreen(screenId) {
  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  document.getElementById(screenId).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (screenId === "yesScreen") {
    startLoveCounter();
    createConfetti();
  }
}

nextButtons.forEach(button => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.next);
    startMusic();
  });
});

yesButton.addEventListener("click", () => {
  showScreen("yesScreen");
  startMusic();
});

againButton.addEventListener("click", () => {
  noClickCount = 0;
  hintText.textContent = "Hint: The “No” button is a little shy. 😄";
  showScreen("welcomeScreen");
});

noButton.addEventListener("mouseenter", moveNoButton);

noButton.addEventListener("click", () => {
  noClickCount++;

  if (noClickCount === 1) {
    hintText.textContent = "Are you sure? My heart is already yours 🥺";
  } else if (noClickCount === 2) {
    hintText.textContent = "The No button is running away! 😂";
  } else {
    hintText.textContent = "There is only one correct answer... ❤️";
  }

  moveNoButton();
});

function moveNoButton() {
  const areaRect = buttonArea.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();

  const maxX = Math.max(0, areaRect.width - buttonRect.width);
  const maxY = Math.max(0, areaRect.height - buttonRect.height);

  noButton.style.position = "absolute";
  noButton.style.left = `${Math.random() * maxX}px`;
  noButton.style.top = `${Math.random() * maxY}px`;
}

function createHearts() {
  const heartsContainer = document.querySelector(".hearts");

  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("span");

    heart.textContent = ["❤️", "💖", "💕", "💗", "💘"][Math.floor(Math.random() * 5)];

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${6 + Math.random() * 8}s`;
    heart.style.animationDelay = `${Math.random() * 8}s`;
    heart.style.fontSize = `${12 + Math.random() * 22}px`;

    heartsContainer.appendChild(heart);
  }
}

function createStars() {
  const starsContainer = document.querySelector(".stars");

  for (let i = 0; i < 70; i++) {
    const star = document.createElement("span");

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;

    starsContainer.appendChild(star);
  }
}

function createConfetti() {
  const symbols = ["❤️", "💖", "💕", "✨", "🌹", "💝"];

  for (let i = 0; i < 35; i++) {
    const item = document.createElement("span");

    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    item.style.position = "fixed";
    item.style.left = `${Math.random() * 100}%`;
    item.style.top = "-30px";
    item.style.zIndex = "50";
    item.style.fontSize = `${15 + Math.random() * 20}px`;
    item.style.animation = `rise ${3 + Math.random() * 4}s linear forwards`;

    document.body.appendChild(item);

    setTimeout(() => {
      item.remove();
    }, 7000);
  }
}

function startLoveCounter() {

  const startDate = new Date("2024-08-26T00:00:00");

  function updateCounter() {

    const now = new Date();

    let difference = now - startDate;

    if (difference < 0) {
      difference = 0;
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);

    const hours = Math.floor((totalSeconds % 86400) / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const seconds = totalSeconds % 60;

    document.getElementById("days").textContent = days;

    document.getElementById("hours").textContent = String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  }

  updateCounter();

  setInterval(updateCounter, 1000);
}

function startTypingEffect() {
  const text = "Every love story is beautiful, but ours is my favorite.";
  let index = 0;

  const interval = setInterval(() => {
    typingText.textContent += text[index];
    index++;

    if (index >= text.length) {
      clearInterval(interval);
    }
  }, 45);
}

function startMusic() {
  if (!musicStarted) {
    loveMusic.play()
      .then(() => {
        musicStarted = true;
        musicButton.textContent = "🔊";
      })
      .catch(() => {
        musicButton.textContent = "🔇";
      });
  }
}

musicButton.addEventListener("click", () => {
  if (loveMusic.paused) {
    loveMusic.play();
    musicButton.textContent = "🔊";
  } else {
    loveMusic.pause();
    musicButton.textContent = "🔇";
  }
});

document.querySelectorAll(".photo-card img").forEach(image => {
  image.addEventListener("click", () => {
    document.getElementById("lightboxImage").src = image.src;
    document.getElementById("lightbox").classList.add("active");
  });
});

document.getElementById("closeLightbox").addEventListener("click", () => {
  document.getElementById("lightbox").classList.remove("active");
});

document.getElementById("lightbox").addEventListener("click", event => {
  if (event.target.id === "lightbox") {
    event.currentTarget.classList.remove("active");
  }
});

window.addEventListener("load", () => {
  createHearts();
  createStars();
  startTypingEffect();

  setTimeout(() => {
    loadingScreen.classList.add("hidden");
  }, 1200);
});