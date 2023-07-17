    var players = [];
    var currentPlayer = 0;
    var scores = {};

    function startGame() {
      var numPlayers = parseInt(document.getElementById("numPlayers").value);
      if (numPlayers >= 2 && numPlayers <= 10) {
        for (var i = 0; i < numPlayers; i++) {
          var playerName = prompt("نام بازیکن " + (i + 1) + ":");
          if (playerName) {
            players.push(playerName);
            scores[playerName] = 0;
          } else {
            alert("لطفاً نام بازیکن را وارد کنید.");
            return;
          }
        }
        document.getElementById("players").style.display = "none";
        document.getElementById("game").style.display = "block";
      } else {
        alert("تعداد بازیکن‌ها باید بین ۲ تا ۱۰ نفر باشد.");
      }
    }

    function submitAnswers() {
      var letter = document.getElementById("letter").value.toUpperCase();
      var playerName = players[currentPlayer];

      var name = prompt("نام " + playerName + ":");
      var city = prompt("شهر " + playerName + ":");
      var food = prompt("غذا " + playerName + ":");
      var color = prompt("رنگ " + playerName + ":");

      if (name && city && food && color) {
        scores[playerName] += calculateAnswerScore(name, letter);
        scores[playerName] += calculateAnswerScore(city, letter);
        scores[playerName] += calculateAnswerScore(food, letter);
        scores[playerName] += calculateAnswerScore(color, letter);
        updateScoreboard();
      } else {
        scores[playerName] += 0;
      }

      currentPlayer++;
      if (currentPlayer < players.length) {
        resetInputs();
      } else {
        showFinalScores();
      }
    }

    function calculateAnswerScore(answer, letter) {
      if (answer.charAt(0).toUpperCase() === letter) {
        return 5; // اگر حرف اول پاسخ با حرف انتخاب شده برابر باشد، 5 امتیاز
      } else {
        return 0; // در غیر این صورت، صفر امتیاز
      }
    }

    function resetInputs() {
      document.getElementById("letter").value = "";
    }

    function updateScoreboard() {
      var scoreboardTable = document.querySelector("#scoreboard table");
      scoreboardTable.innerHTML = "";
      var tableHead = document.createElement("thead");
      var headRow = document.createElement("tr");
      var nameHead = document.createElement("th");
      nameHead.innerText = "نام بازیکن";
      var scoreHead = document.createElement("th");
      scoreHead.innerText = "امتیاز";
      headRow.appendChild(nameHead);
      headRow.appendChild(scoreHead);
      tableHead.appendChild(headRow);
      scoreboardTable.appendChild(tableHead);

      var tableBody = document.createElement("tbody");
      for (var i = 0; i < players.length; i++) {
        var playerRow = document.createElement("tr");
        var playerName = document.createElement("td");
        playerName.innerText = players[i];
        var playerScore = document.createElement("td");
        playerScore.innerText = scores[players[i]];
        playerRow.appendChild(playerName);
        playerRow.appendChild(playerScore);
        tableBody.appendChild(playerRow);
      }
      scoreboardTable.appendChild(tableBody);
    }

    function showFinalScores() {
      var finalScoresTable = document.getElementById("finalScores");
      finalScoresTable.innerHTML = "";
      for (var i = 0; i < players.length; i++) {
        var playerRow = document.createElement("tr");
        var playerName = document.createElement("td");
        playerName.innerText = players[i];
        var playerScore = document.createElement("td");
        playerScore.innerText = scores[players[i]];
        playerRow.appendChild(playerName);
        playerRow.appendChild(playerScore);
        finalScoresTable.appendChild(playerRow);
      }
      document.getElementById("game").style.display = "none";
      document.getElementById("results").style.display = "block";
    }
