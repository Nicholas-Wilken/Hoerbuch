document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  window.engine = new GameEngine({
    viewportId: "viewport",
    worldId: "world",
    enableZoom: false,
    enablePan: false,
    startScale: 0.33,
    minScale: 0.28,
    maxScale: 20
  });
  riddle2Info();
  const found = new Set();
  document.querySelectorAll(".floating-img")
    .forEach(img => {
      img.addEventListener("click", () => {
        if (engine._moved) {
          engine._moved = false; // reset
          return;
        }
        found.add(img.dataset.id);
        img.classList.add("found");
        if (found.size === 7) {
          win();
        }
      });
    });

  function win() {
    localStorage.setItem('chapter2','unlocked');
    localStorage.setItem('nextChapter', 'riddle3.html');
    engine.unlock(2);
    engine.setNextChapter("riddle3.html");
    engine.resetView({ animated: true});
    overlay.style.pointerEvents = "auto";
    document.getElementById("golem-box").classList.add("transparent");
    document.getElementById("golem-box").classList.remove("hidden");
    engine.setMode("locked");
    showReadyButton({
      text: "Zu den Kapiteln",
      onClick: goToChapterMenu
    });
  }
  window.startGame = function() {
  engine.setMode("explore");
  overlay.style.pointerEvents = "none";
  document.getElementById("golem-box").classList.add("hidden");
  document.getElementById("storyText").classList.add("hidden");
  exitGolem();
};
});