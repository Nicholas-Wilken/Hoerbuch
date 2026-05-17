    const btn = document.getElementById("nriddlebtn");
    btn.innerText = "Zum nächsten Rätsel";
    setTimeout(() => {
      document.querySelectorAll(".chapter-card").forEach(el => {
        el.style.opacity = "1";
      });
    }, 100);
    
    document.addEventListener("DOMContentLoaded", () => {
      const stbox = document.getElementById("story-box");
      stbox.style.height ="80vh";
      initializeChapters();
      if (localStorage.getItem("chapter1") === "unlocked") {
        unlockChapter(1);
       }
      if (localStorage.getItem("chapter2") === "unlocked") {
        unlockChapter(2);
       }
        if (localStorage.getItem("chapter3") === "unlocked") {
        unlockChapter(3);
        }
        if (localStorage.getItem("chapter4") === "unlocked") {
        unlockChapter(4);
        }
        if (localStorage.getItem("chapter5") === "unlocked") {
        unlockChapter(5);
        }
        if (localStorage.getItem("chapter6") === "unlocked") {
        unlockChapter(6);
        }
        if (localStorage.getItem("chapter6") === "unlocked") {
        unlockChapter(6);
        }
        if (localStorage.getItem("chapter7") === "unlocked") {
        unlockChapter(7);
        }
        if (localStorage.getItem("chapter8") === "unlocked") {
        unlockChapter(8);
        }
        if (localStorage.getItem("chapter9") === "unlocked") {
        unlockChapter(9);
        }
        if (localStorage.getItem("chapter10") === "unlocked") {
        unlockChapter(10);
        }
        if (localStorage.getItem("chapter11") === "unlocked") {
        unlockChapter(11);
        }
        if (localStorage.getItem("chapter12") === "unlocked") {
        unlockChapter(12);
        }
        if (localStorage.getItem("chapter-bonus") === "unlocked") {
        unlockChapter(13);
        }

    });
    
    function initializeChapters() {

      let highestUnlocked = 0;

      // höchste Freischaltung finden
      for (let i = 1; i <= 12; i++) {

        if (
          localStorage.getItem(`chapter${i}`)
          === "unlocked"
        ) {

          highestUnlocked = i;
        }
      }
    
      // Falls nichts freigeschaltet:
      // Kapitel 1 sichtbar machen
      if (highestUnlocked === 0) {
    
        showNextChapter(1);
        return;
      }

      // Alle freigeschalteten anzeigen
      for (let i = 1; i <= highestUnlocked; i++) {
    
        unlockChapter(i);
      }
    
      // Nächstes Kapitel sichtbar machen
      const nextChapter = highestUnlocked + 1;
    
      if (nextChapter <= 12) {
    
        showNextChapter(nextChapter);
      }
    
      // Bonus separat
      if (localStorage.getItem("bonusUnlocked")=== "true") {
        unlockBonus();
      }
    }
    
    
    function toggleInfo(id) {
      document.getElementById(`info-${id}`).classList.toggle('visible');
    }

  let currentAudio = null;
  let currentChapter = null;
  function toggleChapter(id) {
    const play = document.getElementById(`play${id}`);
    // Neues Kapitel gewählt
    if (currentChapter !== id) {
      if (currentAudio) {
        currentAudio.pause();
      }
      currentAudio = new Audio(`audio/Kapitel${id}.aac`);
      currentChapter = id;
      currentAudio.play();
      play.innerText = "Pausieren";
      return;
  }
  // Gleiches Kapitel → toggle
  if (currentAudio.paused) {
    currentAudio.play();
  } else {
    currentAudio.pause();
    play.innerText = "Abspielen";
  }
}

  function downloadChapter(id) {
      const link = document.createElement("a");
      link.href = `audio/Kapitel${id}.aac`;
      link.download = `Kapitel${id}.aac`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    function gotoRiddle(id) {
      window.location.href = `riddle${id}.html`;
    }
function unlockChapter(id) {
  const chapter = document.getElementById(`chapter-${id}`);
  if (!chapter) return;
  chapter.classList.remove("hidden");
  chapter.classList.remove("locked");
  const buttons = chapter.querySelector(".chapter-buttons");
  if (buttons) {
    buttons.classList.remove("hidden");
  }
}

function showNextChapter(id) {

  const chapter =
    document.getElementById(`chapter-${id}`);

  if (!chapter) return;

  chapter.classList.remove("hidden");
}
function unlockBonus() {

  const bonus =
    document.getElementById("chapter-bonus");

  if (!bonus) return;

  bonus.classList.remove("hidden");
  bonus.classList.remove("locked");
}