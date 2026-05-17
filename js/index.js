    const storyText = document.getElementById('storyText');
    const storyBox = document.getElementById('storyBox');
    const readyButton = document.getElementById('readyButton');
    const title = document.getElementById('title');
    const nextButton = document.getElementById('nextButton');
    const story = "Hi Rebecca!\n\nHier ist Mal wieder eine meiner bescheuerten Ideen, wenn du dieses Intro siehst, ist es vermutlich schon zu spät und ich stecke  soweit drin, dass ich es durchziehen muss, schon allein dir zuliebe <3\nIch habe mir eine Art Rätselreihe ausgedacht, die du zu lösen hast um das nächste Kapitel erreichen zu können. Du wirst eventuell schon erahnen was es ist, aber lass dich überraschen!\n\nP.S. Ich hoffe, dass passt dir so auch, auch wenn es nicht das gewöhnliche Format für dich ist und natürlich, dass du an den Rätseln genauso viel Spaß wie ich hast, auch wenn es  schwierig war die richtige Balance an Herausforderung und Weiterkommen zu finden";
    let index = 0;
    nextButton.classList.add("hidden");
    readyButton.classList.add("hidden");
    storyBox.classList.add("hidden");

    document.addEventListener("DOMContentLoaded", () => {
     // localStorage.clear();
      const alreadySeen = localStorage.getItem("intro_seen") === "true";
      if (alreadySeen) {
        introGolem();
        skipIntro();
      } else {
        introGolem();
        startIntro();
      }
    });
    function startIntro() {
      storyBox.classList.remove("hidden");
      storyBox.classList.add("visible");
      setTimeout(() => {
          typeWriter({  text: "Hi Rebecca!\n\nHier ist Mal wieder eine meiner bescheuerten Ideen, wenn du dieses Intro siehst, ist es vermutlich schon zu spät und ich stecke  soweit drin, dass ich es durchziehen muss, schon allein dir zuliebe <3\nIch habe mir eine Art Rätselreihe ausgedacht, die du zu lösen hast um das nächste Kapitel erreichen zu können. Du wirst eventuell schon erahnen was es ist, aber lass dich überraschen!\n\nP.S. Ich hoffe, dass passt dir so auch, auch wenn es nicht das gewöhnliche Format für dich ist und natürlich, dass du an den Rätseln genauso viel Spaß wie ich hast, auch wenn es  schwierig war die richtige Balance an Herausforderung und Weiterkommen zu finden",
            target: storyText,
            speed: 12,
            onFinish: () => {
              readyButton.classList.remove("hidden");
              readyButton.classList.add("visible");
            }
          });
      }, 1000);
    }
    function skipIntro() {
      storyBox.style.visibility = "hidden";
      storyText.style.visibility = "hidden";
      readyButton.style.visibility = "hidden";
      storyText.innerHTML = story;
      title.classList.remove("hidden");
      title.classList.add("visible");
      nextButton.classList.remove("hidden");
      nextButton.classList.add("visible");
    }
  
    function showTitle() {
      storyBox.style.opacity = "0";
      storyBox.style.pointerEvents = "none";
      setTimeout(() => {
        storyBox.style.visibility = "hidden";
        title.classList.remove("hidden");
        title.classList.add("visible");
        nextButton.classList.remove("hidden");
        nextButton.classList.add("visible");
        exitGolem();
      }, 500);
    }
    function nButton(){
      const alreadySeen = localStorage.getItem("intro_seen") === "true";
      if (alreadySeen) {
        window.location.href = "main.html";
      } else {
        window.location.href = "riddle1.html";
      }
      localStorage.setItem("intro_seen", "true");
    }