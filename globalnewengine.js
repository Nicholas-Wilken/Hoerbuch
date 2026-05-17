let activeTypewriter = null;
let isResetting = false;
const viewport = document.getElementById("viewport");
const golemBox = document.getElementById("golem-box");
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
function riddle2Info() {
  const storyText = document.getElementById("storyText");
  const golemBox = document.getElementById("golem-box");
  golemBox.classList.add("visible");
  golemBox.classList.remove("hidden");
  storyText.classList.remove("hidden");
  const story ="Hi, suche die 7 Bilder, die hier versteckt sind, wenn du alle gefunden hast, schaltest du das nächste Kapitel frei!\nDu kannst zoomen, tippen und scrollen, viel Erfolg!";
  introGolem();
  setTimeout(() => {
    typeWriter({  text: story,
      target: storyText,
      speed: 12,
      onFinish: () => {
        showReadyButton({
          text: "Bereit!",
          onClick: startGame
        });
      }
  });
  }, 1000);
}  
function goToChapterMenu() {
  setTimeout(() => {
    window.location.href = 'main.html';
  }, 1000);
}
function showReadyButton({ text ,onClick = null} = {}) {
  const btn = document.getElementById("readyButton");
  if (!btn) return;
  btn.classList.remove("hidden");
  btn.classList.add("visible");
  const button = btn.querySelector("button");
  button.innerText = text;
  button.onclick = onClick;
}
function startRiddle(){
  const storyText = document.getElementById("storyText");
  const golemBox = document.getElementById("golem-box");
  golemBox.classList.add("hidden");
  golemBox.classList.remove("visible");
  storyText.classList.add("hidden");
  exitGolem();
}
