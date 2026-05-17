    const answers = { q1: 'treppenhaus', q2: 'arwed', q3: 'pyjama', q4: 'bier', q5: 'ja' };
    const hints = {
      q1: ' 1. Der Raum hatte viele Treppenstufen',
      q2: ' 2. Er lebt mittlerweile bei Kiel',
      q3: ' 3. Du warst quasi schon im Bett',
      q4: ' 4. Gerne wird dies im Kasten transportiert (Grundnahrungsmittel)',
      q5: ' 5. (sinnbildlich zitiert:) Moin! Wir haben nen Kasten dabei! Das ist übrigens Nicho, können wir reinkommen?'
    };
    const attempts = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0 };
    const challengeTasks = {
      q1: {question:'1. Was war dein erster Eindruck von mir?'},
      q2: {question:'2. (Rückblickend) Wieviel "peer pressure/Gruppenzwang/etc" war involviert in deiner Entscheidung uns zu empfangen?'},
      q3: {question:'3. (Rückblickend) Wie wohl hast du dich zu verschiedenen Zeitpunkten an dem Abend gefühlt?'},
      q4: {question:'4. (Rückblickend) Hättest du an dem Abend, mit dem Wissen von heute ähnlich gehandelt? Was hättest du anders gemacht?'},
      q5: {question:'5. Was ist dir damals durch den Kopf gegangen? '}
    };
    let currentHintKey = null;
    document.addEventListener("DOMContentLoaded", () => {
      const unlocked = localStorage.getItem("chapter1") === "unlocked";
      if (unlocked) {
      showMenuButton();
      }
    });
    function checkAnswers() {
      let allCorrect = true;
      for (const key of Object.keys(answers)) {
        const input = document.getElementById(key);
        const value = input.value.trim().toLowerCase();
        input.classList.remove('correct','wrong');
        // RICHTIG
        if (value === answers[key]) {
          input.classList.add('correct');
        } else {
          // FALSCH
          input.classList.add('wrong');
          allCorrect = false;
          attempts[key]++;
          // Hinweis nach 3 Versuchen
          if (attempts[key] >= 3) {
            showHint(key);
            attempts[key] = 0;
            // stoppt weitere Prüfungen
            return;
          }
        }
      }
      // ALLES RICHTIG
      if (allCorrect) {
        localStorage.setItem('chapter1','unlocked');
        localStorage.setItem('nextChapter', 'riddle2.html');
        showMenuButton();
      }
    }
    function showHint(key) {
      currentHintKey = key;
      document.getElementById('hintModal').style.display = 'flex';
      document.getElementById('challengeQuestion').innerText = challengeTasks[key].question;
      document.getElementById('challengeInput').value = '';
      const hintBox = document.getElementById('hintText');
      hintBox.style.display = 'none';
      hintBox.innerText = '';
    }
    function submitChallenge() {
      const value = document.getElementById('challengeInput').value.trim();
      if (value.length < 50) {
        alert('Deine Antwort ist leider etwas zu kurz, 1-2 Sätze noch, dann sollte es passen.');
        return;
      }
  /*
    HIER wird später gespeichert:
    - Zusatzaufgabe
    - Antwort
    - Zeitstempel
    - Kapitel
  */
      console.log({
        type: 'challenge-answer',
        question: currentHintKey,
        answer: value,
        timestamp: new Date().toISOString()
      });
      const hintBox = document.getElementById('hintText');
      hintBox.style.display = 'block';
      hintBox.innerText = 'Hinweis: ' + hints[currentHintKey];
    }
    function closeHintModal() {
      document.getElementById('hintModal').style.display = 'none';
    }
  function showMenuButton() {
    const btn = document.getElementById("check");
    btn.hidden = false;
    btn.onclick = () => { window.location.href = "main.html";};
  }