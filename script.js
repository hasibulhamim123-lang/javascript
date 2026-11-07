// Theme Chnager
let themeBtn = document.querySelector("#theme-btn");
const themes = ["light", "dark", "sepia"];
let currentPosition = 0;

themeBtn.addEventListener("click", function () {
  document.body.classList.remove(themes[currentPosition]);

  currentPosition = currentPosition + 1;

  if (currentPosition === themes.length) {
    currentPosition = 0;
  }

  const activeTheme = themes[currentPosition];
  document.body.classList.add(activeTheme);

  let themeName = activeTheme.charAt(0).toUpperCase() + activeTheme.slice(1);
  themeBtn.textContent = `Theme:${themeName}`;
});

// Counter
let addCounterBtn = document.getElementById("add-counter_btn");
let showCounter = document.querySelector(".show-counter");

function createCounter() {
  let count = 0;

  const counterBox = document.createElement("div");
  const numberDisplay = document.createElement("h3");
  numberDisplay.textContent = count;

  const plusBtn = document.createElement("button");
  plusBtn.textContent = "+";

  const minusBtn = document.createElement("button");
  minusBtn.textContent = "-";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  plusBtn.addEventListener("click", function () {
    count = count + 1;
    numberDisplay.textContent = count;
  });

  minusBtn.addEventListener("click", function () {
    if (count > 0) {
      count = count - 1;
      numberDisplay.textContent = count;
    }
  });

  deleteBtn.addEventListener("click", function () {
    counterBox.remove();
  });

  counterBox.append(numberDisplay, plusBtn, minusBtn, deleteBtn);
  showCounter.appendChild(counterBox);
}
addCounterBtn.addEventListener("click", createCounter);

// Traffic Light
let redLight = document.querySelector(".red");
let yellowLight = document.querySelector(".yellow");
let greenLight = document.querySelector(".green");
let toggleBtn = document.getElementById("toggle-btn");

let lights = [
  { color: "red", time: 3000 },
  { color: "yellow", time: 1000 },
  { color: "green", time: 3000 },
];

let currentIndex = 0;
let timerId;
let isPaused = false;

function turnOffAllLights() {
  redLight.classList.remove("active");
  yellowLight.classList.remove("active");
  greenLight.classList.remove("active");
}

function startLight() {
  turnOffAllLights();
  let currentLightData = lights[currentIndex];

  if (currentLightData.color === "red") {
    redLight.classList.add("active");
  } else if (currentLightData.color === "yellow") {
    yellowLight.classList.add("active");
  } else if (currentLightData.color === "green") {
    greenLight.classList.add("active");
  }

  timerId = setTimeout(function () {
    currentIndex = currentIndex + 1;

    if (currentIndex === 3) {
      currentIndex = 0;
    }

    startLight();
  }, currentLightData.time);
}

toggleBtn.addEventListener("click", function () {
  if (isPaused === false) {
    isPaused = true;
    toggleBtn.innerText = "Resume";
    clearTimeout(timerId);
  } else {
    isPaused = false;
    toggleBtn.innerText = "Pause";
    startLight();
  }
});
startLight();

//Color History
let colorBtn = document.getElementById("color-btn");
let colorCodeText = document.getElementById("color-code");
let historyContainer = document.getElementById("history-container");
let colorCard = document.querySelector(".color-card");
let colorHistory = [];

function getRandomColor() {
  let letter = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letter[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateHistory() {
  historyContainer.innerHTML = "";
  colorHistory.forEach((color) => {
    let box = document.createElement("div");
    box.classList.add("history-box");
    box.style.backgroundColor = color;
    box.addEventListener("click", () => {
      colorCard.style.backgroundColor = color;
      colorCodeText.textContent = `Current Color: ${color}`;
    });

    historyContainer.appendChild(box);
  });
}

colorBtn.addEventListener("click", function () {
  let newColor = getRandomColor();
  colorCard.style.backgroundColor = newColor;
  colorCodeText.textContent = `Current Color: ${newColor}`;
  let code = colorHistory.unshift(newColor);

  if (colorHistory.length > 5) {
    colorHistory.pop();
  }
  updateHistory();
});

// Bill Split
let billInput = document.querySelector("#bill-input");
let tipBtns = document.querySelectorAll(".tip-btn");
let customTipInput = document.querySelector("#custom-tip");
let peopleInput = document.querySelector("#people-input");
let tipAmountText = document.querySelector("#tip-amount");
let totalAmountText = document.querySelector("#total-amount");
let perPersonText = document.querySelector("#per-person-amount");

let selectedTipPercent = 0;
function calculateBill() {
  let billValue = parseFloat(billInput.value);
  let peopleValue = parseInt(peopleInput.value);
  let customTipValue = parseFloat(customTipInput.value);

  let tipPercent = !isNaN(customTipValue) ? customTipValue : selectedTipPercent;

  let tipAmount = billValue * (tipPercent / 100);
  let totalBill = billValue + tipAmount;
  let amountPerPerson = totalBill / peopleValue;

  tipAmountText.textContent = `$${tipAmount.toFixed(2)}`;
  totalAmountText.textContent = `$${totalBill.toFixed(2)}`;
  perPersonText.textContent = `$${amountPerPerson.toFixed(2)}`;
}

billInput.addEventListener("input", calculateBill);
peopleInput.addEventListener("input", calculateBill);

customTipInput.addEventListener("input", () => {
  tipBtns.forEach((btn) => btn.classList.remove("active"));
  selectedTipPercent = 0;
  calculateBill();
});

tipBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    tipBtns.forEach((button) => button.classList.remove("active"));
    customTipInput.value = "";

    e.target.classList.add("active");
    selectedTipPercent = parseInt(e.target.getAttribute("data-tip"));

    calculateBill();
  });
});

// unit Converter
let unitNumberInput = document.querySelector("#unit-number-input");
let unitFromSelect = document.querySelector("#unit-from");
let unitToSelect = document.querySelector("#unit-to");
let unitSwapBtn = document.querySelector("#unit-swap-btn");
let unitResultOutput = document.querySelector("#unit-result-output");

let unitConversionRates = {
  m: 1,
  km: 1000,
  cm: 0.01,
  ft: 0.3048,
  in: 0.0254,
  mi: 1609.344,
};

function convertUnits() {
  let inputValue = parseFloat(unitNumberInput.value);
  let fromUnit = unitFromSelect.value;
  let toUnit = unitToSelect.value;

  if (isNaN(inputValue)) {
    unitResultOutput.textContent = "0.00";
    return;
  }

  let valueInMeters = inputValue * unitConversionRates[fromUnit];
  let finalResult = valueInMeters / unitConversionRates[toUnit];
  unitResultOutput.textContent = finalResult.toFixed(4);
}
unitNumberInput.addEventListener("input", convertUnits);
unitFromSelect.addEventListener("change", convertUnits);
unitToSelect.addEventListener("change", convertUnits);

convertUnits();

// Tweet Composer
let tweetInput = document.querySelector("#tweet-input");
let tweetCounter = document.querySelector("#tweet-counter");
let tweetPostBtn = document.querySelector("#tweet-post-btn");
let tweetFeed = document.querySelector("#tweet-feed");

let maxCharacters = 20;

tweetInput.addEventListener("input", () => {
  let text = tweetInput.value;
  let currentLength = text.length;
  let remaining = maxCharacters - currentLength;

  tweetCounter.textContent = `${remaining} left`;

  if (remaining < 0) {
    tweetCounter.classList.add("over-limit");
  } else {
    tweetCounter.classList.remove("over-limit");
  }

  let isEmptyOrSpaces = text.trim().length === 0;
  let isOverLimit = currentLength > maxCharacters;

  if (isEmptyOrSpaces || isOverLimit) {
    tweetPostBtn.disabled = true;
  } else {
    tweetPostBtn.disabled = false;
  }
});

tweetPostBtn.addEventListener("click", () => {
  let text = tweetInput.value.trim();
  if (text.length === 0 || text.length > maxCharacters) return;

  let now = new Date();
  let timeString = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let tweetItem = document.createElement("div");
  tweetItem.classList.add("tweet-item");

  tweetItem.innerHTML = `
    <div class="tweet-text">${text}</div>
    <div class="tweet-time">${timeString}</div>
  `;
  tweetFeed.prepend(tweetItem);
  tweetInput.value = "";
  tweetCounter.textContent = `${maxCharacters} left`;
  tweetCounter.classList.remove("over-limit");
  tweetPostBtn.disabled = true;
});

// PWD Checker

let pwdInput = document.querySelector("#pwd-input");
let pwdToggleBtn = document.querySelector(".password-toggle-btn");
let pwdStrongMsg = document.querySelector(".password-strong-msg");

let ruleLength = document.querySelector("#password-length");
let ruleNumber = document.querySelector("#password-number");
let ruleUppercase = document.querySelector("#password-uppercase");
let ruleSymbol = document.querySelector("#password-symbol");

pwdToggleBtn.addEventListener("click", () => {
  if (pwdInput.type === "password") {
    pwdInput.type = "text";
    pwdToggleBtn.textContent = "🙈";
  } else {
    pwdInput.type = "password";
    pwdToggleBtn.textContent = "👁️";
  }
});
console.log("Hamim");

pwdInput.addEventListener("input", () => {
  let value = pwdInput.value;

  let checkLength = value.length >= 8;
  let checkNumber = /[0-9]/.test(value);
  let checkUpper = /[A-Z]/.test(value);
  let checkSymbol = /[^A-Za-z0-9]/.test(value);

  updateRuleStatus(ruleLength, checkLength);
  updateRuleStatus(ruleNumber, checkNumber);
  updateRuleStatus(ruleUppercase, checkUpper);
  updateRuleStatus(ruleSymbol, checkSymbol);

  if (checkLength && checkNumber && checkUpper && checkSymbol) {
    pwdStrongMsg.classList.add("show");
  } else {
    pwdStrongMsg.classList.remove("show");
  }
});

function updateRuleStatus(element, e) {
  let iconSpan = element.querySelector("span");
  if (e) {
    element.classList.add("checked");
    F;
    iconSpan.textContent = "✓";
  } else {
    element.classList.remove("checked");
    iconSpan.textContent = "○";
  }
}

// Grade Report
let students = [
  { name: "Rafi", score: 82 },
  { name: "Mim", score: 67 },
  { name: "Tanvir", score: 91 },
  { name: "Nila", score: 45 },
  { name: "Sakib", score: 73 },
  { name: "Anik", score: 38 },
  { name: "Sadia", score: 88 },
];

function getGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
}

function renderReport() {
  let container = document.querySelector(".grade-container");
  if (!container) return;

  let tbody = container.querySelector(".grade-tbody");
  let summaryDiv = container.querySelector(".grade-summary");

  tbody.innerHTML = "";

  students.forEach((student) => {
    let grade = getGrade(student.score);
    let isFailing = student.score < 50;

    let row = document.createElement("tr");
    if (isFailing) {
      row.classList.add("grade-row-fail");
    }

    row.innerHTML = `<td>${student.name}</td>
      <td>${student.score}</td>
      <td>${grade}</td>`;
    tbody.appendChild(row);
  });

  let totalScore = students.reduce((sum, student) => sum + student.score, 0);
  let classAverage = (totalScore / students.length).toFixed(1);
  let highestStudent = students.reduce(
    (max, student) => (student.score > max.score ? student : max),
    students[0],
  );
  let passedCount = students.filter((student) => student.score >= 50).length;

  summaryDiv.innerHTML = `<div>Class Average: ${classAverage}</div>
    <div>Highest Score: ${highestStudent.name} (${highestStudent.score})</div>
    <div>Students Passed: ${passedCount} / ${students.length}</div>`;
}
renderReport();

// Cart
let container = document.querySelector(".cart-container");
let tbody = container.querySelector(".cart-tbody");
let emptyMsg = container.querySelector(".cart-empty");
let tableElement = container.querySelector(".cart-table");
let summaryDiv = container.querySelector(".cart-summary");

let cartItems = [
  { name: "Laptop", price: 1200, qty: 1 },
  { name: "Mouse", price: 25, qty: 2 },
  { name: "Keyboard", price: 75, qty: 1 },
  { name: "Monitor", price: 300, qty: 1 },
];

function renderCart() {
  tbody.innerHTML = "";

  if (cartItems.length === 0) {
    emptyMsg.style.display = "block";
    emptyMsg.textContent = "Your cart is empty";
    return;
  } else {
    tableElement.style.display = "table";
    summaryDiv.style.display = "flex";
    emptyMsg.style.display = "none";
  }

  cartItems.forEach((item, index) => {
    let row = document.createElement("tr");
    let totallPrice = item.price * item.qty;

    row.innerHTML = ` <td>${item.name}</td>
      <td>$${item.price}</td>
      <td>
        <button class="cart-btn-qty" onclick="updateQty(${index}, -1)">-</button>
        <span>${item.qty}</span>
        <button class="cart-btn-qty" onclick="updateQty(${index}, 1)">+</button>
      </td>
      <td>$${totallPrice}</td>
      <td>
        <button class="cart-btn-remove" onclick="removeItem(${index})">Remove</button>
      </td> `;
    tbody.appendChild(row);
  });
  let subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  let tax = subtotal * 0.05;
  let total = subtotal + tax;

  summaryDiv.innerHTML = `
    <div class="cart-summary-row"><span>Subtotal:</span> <span>$${subtotal.toFixed(2)}</span></div>
    <div class="cart-summary-row"><span>Tax (5%):</span> <span>$${tax.toFixed(2)}</span></div>
    <div class="cart-summary-row cart-summary-total"><span>Total:</span> <span>$${total.toFixed(2)}</span></div>
  `;
}

function updateQty(index, change) {
  cartItems[index].qty += change;
  if (cartItems[index].qty < 1) {
    cartItems[index].qty = 1;
  }
  renderCart();
}

function removeItem(index) {
  cartItems.splice(index, 1);
  renderCart();
}

renderCart();

// Promodoro
let promoContainerEl = document.querySelector(".promo-container");
let promoWorkInput = promoContainerEl.querySelector(".promo-input-work");
let promoShortInput = promoContainerEl.querySelector(".promo-input-short");
let promoLongInput = promoContainerEl.querySelector(".promo-input-long");
let promoModeEl = promoContainerEl.querySelector(".promo-mode");
let promoTimerEl = promoContainerEl.querySelector(".promo-timer");
let promoCounterEl = promoContainerEl.querySelector(".promo-counter");
let promoStartBtn = promoContainerEl.querySelector(".promo-btn-start");
let promoPauseBtn = promoContainerEl.querySelector(".promo-btn-pause");
let promoResetBtn = promoContainerEl.querySelector(".promo-btn-reset");

let promoIntervalId = null;
let promoTimeRemaining = 25 * 60;
let promoCurrentMode = "Focus";
let promoSessionsCompleted = 0;
let promoIsRunning = false;

function promoFormatTime(seconds) {
  let promoMins = Math.floor(seconds / 60);
  let promoSecs = seconds % 60;
  return `${String(promoMins).padStart(2, "0")}:${String(promoSecs).padStart(2, "0")}`;
}

function promoUpdateDisplay() {
  promoTimerEl.textContent = promoFormatTime(promoTimeRemaining);
  promoModeEl.textContent = promoCurrentMode;
  promoCounterEl.textContent = `Sessions completed: ${promoSessionsCompleted}`;
}

function promoStartTimer() {
  if (promoIsRunning) return;
  promoIsRunning = true;

  promoIntervalId = setInterval(() => {
    if (promoTimeRemaining > 0) {
      promoTimeRemaining--;
      promoUpdateDisplay();
    } else {
      clearInterval(promoIntervalId);
      promoIsRunning = false;
      promoHandleTimerComplete();
    }
  }, 1000);
}

function promoPauseTimer() {
  promoIsRunning = false;
  clearInterval(promoIntervalId);
}

function promoResetTimer() {
  promoPauseTimer();
  if (promoCurrentMode === "Focus") {
    promoTimeRemaining = Number(promoWorkInput.value) * 60 || 1500;
  } else if (promoCurrentMode === "Short Break") {
    promoTimeRemaining = Number(promoShortInput.value) * 60 || 300;
  } else {
    promoTimeRemaining = Number(promoLongInput.value) * 60 || 900;
  }
  promoUpdateDisplay();
}

function promoHandleTimerComplete() {
  if (promoCurrentMode === "Focus") {
    promoSessionsCompleted++;
    if (promoSessionsCompleted % 4 === 0) {
      promoCurrentMode = "Long Break";
      promoTimeRemaining = Number(promoLongInput.value) * 60 || 900;
    } else {
      promoCurrentMode = "Short Break";
      promoTimeRemaining = Number(promoShortInput.value) * 60 || 300;
    }
  } else {
    promoCurrentMode = "Focus";
    promoTimeRemaining = Number(promoWorkInput.value) * 60 || 1500;
  }
  promoUpdateDisplay();
  promoStartTimer();
}

promoWorkInput.addEventListener("change", () => {
  if (!promoIsRunning && promoCurrentMode === "Focus") {
    promoTimeRemaining = Number(promoWorkInput.value) * 60;
    promoUpdateDisplay();
  }
});

promoShortInput.addEventListener("change", () => {
  if (!promoIsRunning && promoCurrentMode === "Short Break") {
    promoTimeRemaining = Number(promoShortInput.value) * 60;
    promoUpdateDisplay();
  }
});

promoLongInput.addEventListener("change", () => {
  if (!promoIsRunning && promoCurrentMode === "Long Break") {
    promoTimeRemaining = Number(promoLongInput.value) * 60;
    promoUpdateDisplay();
  }
});

promoStartBtn.addEventListener("click", promoStartTimer);
promoPauseBtn.addEventListener("click", promoPauseTimer);
promoResetBtn.addEventListener("click", promoResetTimer);

promoUpdateDisplay();

// Counter
let containerEl = document.querySelector(".count-container");
let nameInput = containerEl.querySelector(".count-input-name");
let dateInput = containerEl.querySelector(".count-input-date");
let startBtn = containerEl.querySelector(".count-btn-start");
let displayDiv = containerEl.querySelector(".count-display");
let nameTarget = containerEl.querySelector(".count-name-target");
let daysEl = containerEl.querySelector(".count-days");
let hoursEl = containerEl.querySelector(".count-hours");
let minsEl = containerEl.querySelector(".count-mins");
let secsEl = containerEl.querySelector(".count-secs");
let msgEl = containerEl.querySelector(".count-message");

let countdownIntervalId = null;

function getTimeRemaining(targetDate) {
  let total = targetDate - new Date();
  if (total <= 0) return { total: 0, days: 0, hours: 0, mins: 0, secs: 0 };

  let days = Math.floor(total / (1000 * 60 * 60 * 24));
  let hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  let mins = Math.floor((total / 1000 / 60) % 60);
  let secs = Math.floor((total / 1000) % 60);

  return { total, days, hours, mins, secs };
}

function renderCountdown(timeData) {
  daysEl.textContent = String(timeData.days).padStart(2, "0");
  hoursEl.textContent = String(timeData.hours).padStart(2, "0");
  minsEl.textContent = String(timeData.mins).padStart(2, "0");
  secsEl.textContent = String(timeData.secs).padStart(2, "0");
}

function handleCountdown() {
  clearInterval(countdownIntervalId);

  let eventName = nameInput.value.trim() || "Event";
  let targetDate = new Date(dateInput.value);

  if (!dateInput.value) return;

  displayDiv.style.display = "block";
  nameTarget.textContent = eventName;
  msgEl.textContent = "";

  let initialCheck = getTimeRemaining(targetDate);
  if (initialCheck.total <= 0) {
    msgEl.textContent = "That date has already passed";
    renderCountdown({ days: 0, hours: 0, mins: 0, secs: 0 });
    return;
  }

  renderCountdown(initialCheck);

  countdownIntervalId = setInterval(() => {
    let timeData = getTimeRemaining(targetDate);

    if (timeData.total <= 0) {
      clearInterval(countdownIntervalId);
      renderCountdown({ days: 0, hours: 0, mins: 0, secs: 0 });
      msgEl.textContent = "It's here! 🎉";
      return;
    }

    renderCountdown(timeData);
  }, 1000);
}

startBtn.addEventListener("click", handleCountdown);

// Typing Speeed
let sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "JavaScript is a versatile programming language.",
  "Practice makes a developer better every single day.",
  "Coding is like solving puzzles with logic and creativity.",
  "Keep building projects to master your web development skills.",
];

let typingContainerEl = document.querySelector(".typing-container");
let sentenceEl = typingContainerEl.querySelector(".typing-sentence");
let inputEl = typingContainerEl.querySelector(".typing-input");
let resultsEl = typingContainerEl.querySelector(".typing-results");
let timeEl = typingContainerEl.querySelector(".typing-time");
let wpmEl = typingContainerEl.querySelector(".typing-wpm");
let accuracyEl = typingContainerEl.querySelector(".typing-accuracy");
let resetBtn = typingContainerEl.querySelector(".typing-btn-reset");

let currentSentence = "";
let typingIntervalId = null;
let startTime = null;
let isStarted = false;

function initTest() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceEl.innerHTML = currentSentence
    .split("")
    .map((char) => `<span>${char}</span>`)
    .join("");
  inputEl.value = "";
  inputEl.disabled = false;
  resultsEl.style.display = "none";
  isStarted = false;
  startTime = null;
  clearInterval(typingIntervalId);
}

inputEl.addEventListener("input", () => {
  if (!isStarted) {
    isStarted = true;
    startTime = Date.now();
    typingIntervalId = setInterval(() => {
      let elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      timeEl.textContent = elapsedSeconds;
    }, 1000);
  }

  let typedText = inputEl.value;
  let spanElements = sentenceEl.querySelectorAll("span");
  let correctChars = 0;

  spanElements.forEach((span, index) => {
    let char = typedText[index];
    if (char == null) {
      span.className = "";
    } else if (char === currentSentence[index]) {
      span.className = "correct";
      correctChars++;
    } else {
      span.className = "incorrect";
    }
  });

  if (typedText.length >= currentSentence.length) {
    clearInterval(typingIntervalId);
    inputEl.disabled = true;

    let totalSeconds = (Date.now() - startTime) / 1000;
    let minutes = totalSeconds / 60;
    let words = currentSentence.split(" ").length;
    let wpm = Math.round(words / minutes || 0);
    let accuracy = Math.round((correctChars / currentSentence.length) * 100);

    timeEl.textContent = Math.round(totalSeconds);
    wpmEl.textContent = wpm;
    accuracyEl.textContent = accuracy;
    resultsEl.style.display = "block";
  }
});

resetBtn.addEventListener("click", initTest);

initTest();

// Rection Test
let reactContainerEl = document.querySelector(".react-container");
let reactBoxEl = reactContainerEl.querySelector(".react-box");
let reactResultsEl = reactContainerEl.querySelector(".react-results");

let reactCurrentRound = 1;
let reactGameState = "idle";
let reactRoundTimes = [];
let reactTimeoutId = null;

function reactUpdateBoxText(text, bgColor) {
  reactBoxEl.textContent = text;
  reactBoxEl.style.backgroundColor = bgColor;
}

function reactHandleBoxClick() {
  if (reactGameState === "idle") {
    reactStartRound();
  } else if (reactGameState === "waiting") {
    clearTimeout(reactTimeoutId);
    reactUpdateBoxText("Too early! Click to restart round", "#dc3545");
    reactGameState = "idle";
  } else if (reactGameState === "ready") {
    let reactReactionTime = Date.now() - reactStartTime;
    reactRoundTimes.push(reactReactionTime);

    if (reactCurrentRound < 5) {
      reactCurrentRound++;
      reactUpdateBoxText(
        `Round ${reactCurrentRound - 1}: ${reactReactionTime}ms. Click for next round`,
        "#007bff",
      );
      reactGameState = "idle";
    } else {
      reactGameState = "finished";
      reactShowFinalResults();
    }
  } else if (reactGameState === "finished") {
    reactResetGame();
  }
}

function reactStartRound() {
  reactGameState = "waiting";
  reactUpdateBoxText(
    `Round ${reactCurrentRound}: Wait for green...`,
    "#dc3545",
  );

  let reactRandomDelay = Math.floor(Math.random() * 3000) + 1000;

  reactTimeoutId = setTimeout(() => {
    reactGameState = "ready";
    reactStartTime = Date.now();
    reactUpdateBoxText("CLICK NOW!", "#28a745");
  }, reactRandomDelay);
}

function reactShowFinalResults() {
  let reactSum = reactRoundTimes.reduce((a, b) => a + b, 0);
  let reactAvg = Math.round(reactSum / reactRoundTimes.length);
  let reactBest = Math.min(...reactRoundTimes);

  let reactHtml = `<strong>Game Over! All 5 times:</strong><br>`;
  reactRoundTimes.forEach((t, i) => {
    reactHtml += `Round ${i + 1}: ${t}ms<br>`;
  });
  reactHtml += `<br><strong>Average:</strong> ${reactAvg}ms<br>`;
  reactHtml += `<strong>Best:</strong> ${reactBest}ms<br><br>`;
  reactHtml += `<em>Click box to play again</em>`;

  reactResultsEl.innerHTML = reactHtml;
  reactResultsEl.style.display = "block";
  reactBoxEl.textContent = "Play Again";
  reactBoxEl.style.backgroundColor = "#6c757d";
}

function reactResetGame() {
  reactCurrentRound = 1;
  reactRoundTimes = [];
  reactResultsEl.style.display = "none";
  reactGameState = "idle";
  reactUpdateBoxText("Click to start", "#007bff");
}

reactBoxEl.addEventListener("click", reactHandleBoxClick);

// Lap Stop Watch
let lapContainerEl = document.querySelector(".lap-container");
let lapDisplayEl = lapContainerEl.querySelector(".lap-timer-display");
let lapStartBtn = lapContainerEl.querySelector(".lap-btn-start");
let lapStopBtn = lapContainerEl.querySelector(".lap-btn-stop");
let lapLapBtn = lapContainerEl.querySelector(".lap-btn-lap");
let lapResetBtn = lapContainerEl.querySelector(".lap-btn-reset");
let lapListEl = lapContainerEl.querySelector(".lap-list");

let lapTimeMs = 0;
let lapIntervalId = null;
let lapIsRunning = false;
let lapRecords = [];
let lapLastRecordedTime = 0;

function lapFormatTime(ms) {
  let lapTotalSecs = Math.floor(ms / 1000);
  let lapMins = Math.floor(lapTotalSecs / 60);
  let lapSecs = lapTotalSecs % 60;
  let lapCenti = Math.floor((ms % 1000) / 10);

  let lapStrMins = String(lapMins).padStart(2, "0");
  let lapStrSecs = String(lapSecs).padStart(2, "0");
  let lapStrCenti = String(lapCenti).padStart(2, "0");

  return `${lapStrMins}:${lapStrSecs}.${lapStrCenti}`;
}

function lapUpdateDisplay() {
  lapDisplayEl.textContent = lapFormatTime(lapTimeMs);
}

function lapRenderList() {
  lapListEl.innerHTML = "";
  if (lapRecords.length === 0) return;

  let lapValues = lapRecords.map((item) => item.duration);
  let lapMinVal = Math.min(...lapValues);
  let lapMaxVal = Math.max(...lapValues);

  lapRecords.forEach((item, index) => {
    let lapLi = document.createElement("li");
    lapLi.className = "lap-item";

    let lapClassText = "";
    if (lapRecords.length >= 3) {
      if (item.duration === lapMinVal) lapClassText = "lap-fastest";
      if (item.duration === lapMaxVal) lapClassText = "lap-slowest";
    }

    lapLi.innerHTML = `<span>Lap ${lapRecords.length - index}</span> <span class="${lapClassText}">${lapFormatTime(item.duration)}</span>`;
    lapListEl.appendChild(lapLi);
  });
}

function lapStartTimer() {
  if (lapIsRunning) return;
  lapIsRunning = true;
  let lapStartTime = Date.now() - lapTimeMs;

  lapIntervalId = setInterval(() => {
    lapTimeMs = Date.now() - lapStartTime;
    lapUpdateDisplay();
  }, 10);
}

function lapStopTimer() {
  lapIsRunning = false;
  clearInterval(lapIntervalId);
}

function lapRecordLap() {
  if (!lapIsRunning) return;
  let lapCurrentDuration = lapTimeMs - lapLastRecordedTime;
  lapLastRecordedTime = lapTimeMs;

  lapRecords.unshift({ duration: lapCurrentDuration });
  lapRenderList();
}

function lapResetTimer() {
  lapStopTimer();
  lapTimeMs = 0;
  lapLastRecordedTime = 0;
  lapRecords = [];
  lapUpdateDisplay();
  lapListEl.innerHTML = "";
}

lapStartBtn.addEventListener("click", lapStartTimer);
lapStopBtn.addEventListener("click", lapStopTimer);
lapLapBtn.addEventListener("click", lapRecordLap);
lapResetBtn.addEventListener("click", lapResetTimer);

lapUpdateDisplay();

// Sign Up Form
let signupContainerEl = document.querySelector(".signup-container");
let signupFormEl = signupContainerEl.querySelector(".signup-form");
let signupNameInput = signupContainerEl.querySelector(".signup-input-name");
let signupEmailInput = signupContainerEl.querySelector(".signup-input-email");
let signupPasswordInput = signupContainerEl.querySelector(
  ".signup-input-password",
);
let signupConfirmInput = signupContainerEl.querySelector(
  ".signup-input-confirm",
);
let signupTermsInput = signupContainerEl.querySelector(".signup-input-terms");
let signupSubmitBtn = signupContainerEl.querySelector(".signup-btn-submit");
let signupWelcomeEl = signupContainerEl.querySelector(".signup-welcome");

let signupNameError = signupContainerEl.querySelector(".signup-error-name");
let signupEmailError = signupContainerEl.querySelector(".signup-error-email");
let signupPasswordError = signupContainerEl.querySelector(
  ".signup-error-password",
);
let signupConfirmError = signupContainerEl.querySelector(
  ".signup-error-confirm",
);

let signupValidityState = {
  name: false,
  email: false,
  password: false,
  confirm: false,
  terms: false,
};

function signupCheckValidity() {
  let signupAllValid = Object.values(signupValidityState).every(
    (val) => val === true,
  );
  signupSubmitBtn.disabled = !signupAllValid;
}

function signupValidateName() {
  let signupVal = signupNameInput.value.trim();
  if (signupVal.length >= 2) {
    signupNameError.style.display = "none";
    signupValidityState.name = true;
  } else {
    signupNameError.style.display = "block";
    signupValidityState.name = false;
  }
  signupCheckValidity();
}

function signupValidateEmail() {
  let signupVal = signupEmailInput.value.trim();
  let signupEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (signupEmailRegex.test(signupVal)) {
    signupEmailError.style.display = "none";
    signupValidityState.email = true;
  } else {
    signupEmailError.style.display = "block";
    signupValidityState.email = false;
  }
  signupCheckValidity();
}

function signupValidatePassword() {
  let signupVal = signupPasswordInput.value;
  let signupHasLength = signupVal.length >= 6;
  let signupHasUpper = /[A-Z]/.test(signupVal);
  let signupHasNum = /[0-9]/.test(signupVal);
  let signupHasSpecial = /[\W_]/.test(signupVal);

  if (signupHasLength && signupHasUpper && signupHasNum && signupHasSpecial) {
    signupPasswordError.style.display = "none";
    signupValidityState.password = true;
  } else {
    signupPasswordError.style.display = "block";
    signupValidityState.password = false;
  }
  signupValidateConfirm();
  signupCheckValidity();
}

function signupValidateConfirm() {
  let signupPassVal = signupPasswordInput.value;
  let signupConfirmVal = signupConfirmInput.value;

  if (signupConfirmVal !== "" && signupPassVal === signupConfirmVal) {
    signupConfirmError.textContent = "Passwords match ✓";
    signupConfirmError.style.color = "#28a745";
    signupConfirmError.style.display = "block";
    signupValidityState.confirm = true;
  } else {
    signupConfirmError.textContent = "Passwords don't match";
    signupConfirmError.style.color = "#dc3545";
    signupConfirmError.style.display = "block";
    signupValidityState.confirm = false;
  }
  signupCheckValidity();
}

function signupValidateTerms() {
  signupValidityState.terms = signupTermsInput.checked;
  signupCheckValidity();
}

signupNameInput.addEventListener("input", signupValidateName);
signupEmailInput.addEventListener("input", signupValidateEmail);
signupPasswordInput.addEventListener("input", signupValidatePassword);
signupConfirmInput.addEventListener("input", signupValidateConfirm);
signupTermsInput.addEventListener("change", signupValidateTerms);

signupFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  let signupUserName = signupNameInput.value.trim();
  signupFormEl.style.display = "none";
  signupWelcomeEl.textContent = `Welcome, ${signupUserName}!`;
  signupWelcomeEl.style.display = "block";
});

// CouponCode

let couponContainer = document.querySelector(".coupon-container");
let couponSubtotalVal = document.querySelector(".coupon-subtotal-val");
let couponTotalVal = document.querySelector(".coupon-total-val");
let couponDiscountRow = document.querySelector(".coupon-discount-row");
let couponAppliedName = document.querySelector(".coupon-applied-name");
let couponDiscountVal = document.querySelector(".coupon-discount-val");
let couponInput = document.querySelector(".coupon-input");
let couponApplyBtn = document.querySelector(".coupon-btn-apply");
let couponMsg = document.querySelector(".coupon-message");
let couponRemoveBtn = document.querySelector(".coupon-btn-remove");

let couponSubtotal = 1200.0;
let couponActiveData = null;

let couponValidCodes = {
  SAVE10: { type: "percent", value: 10 },
  FLAT50: { type: "flat", value: 50 },
  BIGSALE: { type: "percent", value: 25, minSubtotal: 1000 },
};

function couponUpdateUI() {
  let couponDiscountAmount = 0;

  if (couponActiveData) {
    if (couponActiveData.type === "percent") {
      couponDiscountAmount = (couponSubtotal * couponActiveData.value) / 100;
    } else if (couponActiveData.type === "flat") {
      couponDiscountAmount = couponActiveData.value;
    }

    let couponFinalTotal = Math.max(0, couponSubtotal - couponDiscountAmount);

    couponDiscountRow.style.display = "flex";
    couponAppliedName.textContent = couponActiveData.code;
    couponDiscountVal.textContent = `-$${couponDiscountAmount.toFixed(2)}`;
    couponTotalVal.textContent = couponFinalTotal.toFixed(2);
    couponRemoveBtn.style.display = "block";
    couponMsg.textContent = "Coupon applied successfully!";
    couponMsg.style.color = "#28a745";
  } else {
    couponDiscountRow.style.display = "none";
    couponTotalVal.textContent = couponSubtotal.toFixed(2);
    couponRemoveBtn.style.display = "none";
    couponMsg.textContent = "";
  }
}

function couponHandleApply() {
  let couponCodeText = couponInput.value.trim().toUpperCase();

  if (!couponCodeText) return;

  if (couponValidCodes.hasOwnProperty(couponCodeText)) {
    let couponObj = couponValidCodes[couponCodeText];

    if (couponObj.minSubtotal && couponSubtotal <= couponObj.minSubtotal) {
      couponMsg.textContent = `Subtotal must be over $${couponObj.minSubtotal} to use this coupon.`;
      couponMsg.style.color = "#dc3545";
      return;
    }

    couponActiveData = { ...couponObj, code: couponCodeText };
    couponUpdateUI();
    couponInput.value = "";
  } else {
    couponMsg.textContent = "Invalid code";
    couponMsg.style.color = "#dc3545";
  }
}

function couponHandleRemove(e) {
  couponActiveData = null;
  couponMsg.textContent = "";
  couponInput.value = "";
  couponUpdateUI();
}

couponApplyBtn.addEventListener("click", couponHandleApply);
couponRemoveBtn.addEventListener("click", couponHandleRemove);

couponUpdateUI();
