let activeTypewriter = null;
let isResetting = false;
let interactionEnabled = false
const viewport = document.getElementById("viewport");
const golemBox = document.getElementById("golem-box");
const worldWidth = 5016;
const worldHeight = 3344;
let scale = 1.25;
let x = 0;
let y = 0;
const world = document.getElementById("world");
function typeWriter({ text, target, speed = 15, onFinish }) {
  let index = 0;
  let skipped = false;
  // Skip-Funktion
  function skipTyping() {
    skipped = true;
  }
  // global speichern
  activeTypewriter = {
    skip: skipTyping
  };
  // CLICK LISTENER
  function clickSkipHandler() {
    if (activeTypewriter) {
      activeTypewriter.skip();
    }
  }
  document.addEventListener("click", clickSkipHandler);
  function finish() {
    target.innerHTML = text;
    activeTypewriter = null;
    // Listener entfernen
    document.removeEventListener("click", clickSkipHandler);
    onFinish?.();
  }
  function step() {
    if (skipped) {
      finish();
      return;
    }
    if (index < text.length) {
      target.innerHTML =
        text.substring(0, index + 1) +
        '<span class="cursor">|</span>';
      index++;
      setTimeout(step, speed);
    } else {
      finish();
    }
  }
  step();
}

function goToNextRiddle() {

  const next = localStorage.getItem('nextChapter');
  if (next) {
    window.location.href = next;
  } else {
    // Fallback
    window.location.href = 'riddle2.html';
  }
}
function goToChapterMenu() {
  setTimeout(() => {
    window.location.href = 'main.html';
  }, 1000);
}
function render() {
  clampPosition();
  world.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
}
function clampPosition() {
  const vw = viewport.clientWidth;
  const vh = viewport.clientHeight;
  // ECHTE Weltgröße verwenden
  const worldWidth = world.offsetWidth * scale;
  const worldHeight = world.offsetHeight * scale;
  // minimale Positionen
  const minX = vw - worldWidth;
  const minY = vh - worldHeight;
  // clamp X
  if (worldWidth <= vw) {
    x = (vw - worldWidth) / 2;
  } else {
    x = Math.min(0, Math.max(minX, x));
  }
  // clamp Y
  if (worldHeight <= vh) {
    y = (vh - worldHeight) / 2;
  } else {
    y = Math.min(0, Math.max(minY, y));
  }
}
function startResetAnimation() {
  const world = document.getElementById("world");
  const overlay = document.getElementById("overlay");
  isResetting = true;
  interactionEnabled = false;
  engine.noInteractions();
  world.style.transition = "transform 3s ease";
  // 2. zurück zur Startposition + Zoom
  scale = Math.min(
    window.innerWidth / worldWidth,
    window.innerHeight / worldHeight
  ) * 1.25;
  x = (window.innerWidth - worldWidth * scale) / 2;
  y = (window.innerHeight - worldHeight * scale) / 2;
  render();
  // 4. nach Animation UI zeigen
}
function introGolem() {
  const sideCharacter = document.getElementById("sideCharacter");
  if (!sideCharacter) return;
  sideCharacter.classList.remove("hidden");
  sideCharacter.classList.add("visible");
}
function exitGolem() {
  const sideCharacter = document.getElementById("sideCharacter");
  if (!sideCharacter) return;
  sideCharacter.classList.add("hidden");
  sideCharacter.classList.remove("visible");
}