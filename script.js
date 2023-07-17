var players = [];
var currentPlayer = 0;
var scores = {};
var startingLetter;

function startGame() {
  
  startingLetter = document.getElementById("startingLetter").value.toUpperCase();
}

function submitAnswers() {
  var playerName = players[currentPlayer];

  var name = prompt("نام " + playerName + ":");
  var city = prompt("شهر " + playerName + ":");
  var food = prompt("غذا " + playerName + ":");
  var color = prompt("رنگ " + playerName + ":");

  if (name && city && food && color) {
    scores[playerName] += calculateAnswerScore(name, startingLetter);
    scores[playerName] += calculateAnswerScore(city, startingLetter);
    scores[playerName] += calculateAnswerScore(food, startingLetter);
    scores[playerName] += calculateAnswerScore(color, startingLetter);
  } else {
    scores[playerName] += 0;
  }

  currentPlayer++;
  if (currentPlayer < players.length) {
    resetInputs();
  } else {
    calculateFinalScores();
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
  // عملیات پاک کردن ورودی‌ها
}

function calculateFinalScores() {
  var correctAnswers = {};
  for (var i = 0; i < players.length; i++) {
    var playerName = players[i];
    var name = prompt("اسم " + playerName + ":");
    var city = prompt("شهر " + playerName + ":");
    var food = prompt("غذا " + playerName + ":");
    var color = prompt("رنگ " + playerName + ":");

    if (name && city && food && color) {
      correctAnswers[playerName] = 0;
      if (name.charAt(0).toUpperCase() === startingLetter) {
        correctAnswers[playerName] += 5;
      }
      if (city.charAt(0).toUpperCase() === startingLetter) {
        correctAnswers[playerName] += 5;
      }
      if (food.charAt(0).toUpperCase() === startingLetter) {
        correctAnswers[playerName] += 5;
      }
      if (color.charAt(0).toUpperCase() === startingLetter) {
        correctAnswers[playerName] += 5;
      }
    } else {
      alert("لطفاً پاسخ‌های " + playerName + " را وارد کنید.");
    }
  }

  var finalScoresTable = document.getElementById("finalScores");
  finalScoresTable.innerHTML = "";
  for (var i = 0; i < players.length; i++) {
    var playerRow = document.createElement("tr");
    var playerName = document.createElement("td");
    playerName.innerText = players[i];
    var playerScore = document.createElement("td");
    playerScore.innerText = scores[players[i]] + correctAnswers[players[i]];
    playerRow.appendChild(playerName);
    playerRow.appendChild(playerScore);
    finalScoresTable.appendChild(playerRow);
  }
  document.getElementById("game").style.display = "none";
  document.getElementById("results").style.display = "block";
}