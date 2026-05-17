document.addEventListener("DOMContentLoaded", () => {
  window.engine = new GameEngine({
    viewportId: "viewport",
    worldId: "world",
    enableZoom: false,
    enablePan: false,
    startScale: 0.33,
    minScale: 0.28,
    maxScale: 20
  });
  
  const cities = [
    { image: "img/riga.png", answer: "riga"},
    { image: "img/innsbruck.png", answer: "innsbruck"},
    { image: "img/tallinn.png", answer: "tallinn"},
    { image: "img/barcelona.png", answer: "barcelona"},
    { image: "img/porto.png", answer: "porto"},
    { image: "img/amsterdam.png", answer: "amsterdam"},
    { image: "img/venedig.png", answer: "venedig"},
    { image: "img/mehamn.png", answer: "mehamn"},
    { image: "img/dresden.png", answer: "dresden"},
    { image: "img/monaco.png", answer: "monaco"}
  ];
  let currentCity = 9;
const btn = document.getElementById("readyButton");
btn.innerText = "Mal Schauen";
btn.addEventListener("click", checkAnswer);;
engine.setMode("explore");
/*
  function loadCity() {
    const city = cities[currentCity];
    document.getElementById("cityImage").src = city.image;
    document.getElementById("cityInput").value = "";
    document.getElementById("feedback").innerText = "";
  }
  */
  function loadCity() {
  const city = cities[currentCity];
  const overlay = document.getElementById("overlay");
  const img = document.getElementById("cityImage");
  img.onload = () => {
    engine.resetView();
  };
  img.src = city.image;
  document.getElementById("cityInput").value = "Welcher Ort ist das?";
  document.getElementById("feedback").innerText = "";
  engine.setMode("explore");
}
  function checkAnswer() {
    const input = document.getElementById("cityInput").value.trim().toLowerCase();
    const correct = cities[currentCity].answer;
    if (input === correct) {
      document.getElementById("feedback").innerText = "Richtig!";
      currentCity++;
      if (currentCity >= cities.length) {
        document.getElementById("readyButton").innerText = "Zu den Kapiteln";
        document.getElementById("readyButton").addEventListener("click", goToChapterMenu);
        completeRiddle3();
      } else {
        setTimeout(loadCity, 1000);
      }
    } else {
      document.getElementById("feedback").innerText = "Leider falsch!";
    }
  }
  function completeRiddle3() {
    localStorage.setItem("chapter3", "unlocked");
    localStorage.setItem('nextChapter', 'riddle4.html');
  }
  // BUTTON EVENT
 // document.getElementById("readyButton").addEventListener("click", checkAnswer);
  // ERSTE STADT LADEN
  loadCity();
  
});
