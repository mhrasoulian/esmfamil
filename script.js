<!DOCTYPE html>
<html>
<head>
  <title>اسم فامیل</title>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    h1 {
      text-align: center;
    }
    label {
      font-weight: bold;
    }
    #scoreboard {
      margin-bottom: 20px;
    }
    #scoreboard table {
      margin: 0 auto;
      border-collapse: collapse;
    }
    #scoreboard th, #scoreboard td {
      padding: 5px 10px;
    }
    #scoreboard th {
      background-color: #f2f2f2;
    }
    #scoreboard td {
      text-align: center;
    }
    #players {
      text-align: center;
    }
    #players input {
      margin-top: 10px;
    }
    #game, #results {
      display: none;
    }
  </style>
</head>
<body>
  <h1>بازی اسم فامیل</h1>
  <div id="scoreboard">
    <table>
      <tr>
        <th>نام بازیکن</th>
        <th>امتیاز</th>
      </tr>
    </table>
  </div>
  <div id="players">
    <label>تعداد بازیکن‌ها:</label>
    <input type="number" id="numPlayers" min="2">
    <button onclick="startGame()">شروع بازی</button>
  </div>
  <div id="game">
    <label for="letter">حرف:</label>
    <input type="text" id="letter">
    <button onclick="submitAnswers()">ثبت</button>
  </div>
  <div id="results">
    <h2>امتیازات نهایی</h2>
    <table id="finalScores">
      <tr>
        <th>نام بازیکن</th>
        <th>امتیاز</th>
      </tr>
    </table>
  </div>
  <script>
    var players = [];
    var currentPlayer = 0;
    var scores = {};

    function startGame() {
      var numPlayers = parseInt(document.getElementById("numPlayers").value);
      if (numPlayers >= 2) {
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
        alert("حداقل باید دو بازیکن در بازی شرکت کنند.");
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
        var playerName
