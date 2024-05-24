let userGuess = '';
const maxGuessLength = 3;
let secretCode = '';
let startTime; 
let timerInterval;
let timerRunning = false;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('restart').addEventListener('click', restartGame);
    document.getElementById('exit').addEventListener('click', exitGame);
});

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('buttons-container').style.display = 'block';
    secretCode = generateCode();
    createNumberButtons();
    startTimer();
}

function restartGame() {
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('buttons-container').style.display = 'block'; 
    stopTimer();

    userGuess = ''; 
    document.getElementById('user-guess-display').textContent = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('latest-guess').textContent = ''; 

    startTime = Date.now();
    startTimer();
}

function exitGame() {
    const buttonContainer = document.getElementById('number-buttons');
    buttonContainer.innerHTML = '';

    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('buttons-container').style.display = 'none';
    stopTimer();

    userGuess = ''; 
    document.getElementById('user-guess-display').textContent = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('latest-guess').textContent = ''; 

    startTime = Date.now();
    startTimer();
}

function startTimer() {
    if (!timerRunning) {
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000); 
        timerRunning = true;
    }
}

function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').textContent = `Timer: ${elapsedTime}s`; 
}

function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
}

function generateCode() {
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += Math.floor(Math.random() * 10).toString();
    }
    console.log("Secret Code (for debugging):", code);
    return code;
}

function createNumberButtons() {
    const buttonContainer = document.getElementById('number-buttons');
    for (let i = 0; i < 10; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => addNumber(i);
        buttonContainer.appendChild(button);
    }
}

function addNumber(num) {
    if (userGuess.length < maxGuessLength) {
        userGuess += num.toString();
        updateUserGuessDisplay();
        startTimer();
    }
}

function clearGuess() {
    userGuess = '';
    updateUserGuessDisplay();
}

function updateUserGuessDisplay() {
    document.getElementById('user-guess-display').textContent = userGuess;
}

function updateLatestGuessDisplay() {
    const latestGuessDisplay = document.getElementById('latest-guess');
    latestGuessDisplay.textContent = userGuess;
}

function makeGuess() {
    const feedback = document.getElementById('feedback');

    if (userGuess.length !== maxGuessLength) {
        feedback.textContent = 'Please enter exactly 5 digits.';
        feedback.style.color = 'red';
        return;
    }

    let correctPositions = 0;
    let correctNumbers = 0;

    const secretCodeOccurrences = {};
    const userGuessOccurrences = {};

    for (let i = 0; i < maxGuessLength; i++) {
        if (userGuess[i] === secretCode[i]) {
            correctPositions++;
        } else {
            secretCodeOccurrences[secretCode[i]] = (secretCodeOccurrences[secretCode[i]] || 0) + 1;
            userGuessOccurrences[userGuess[i]] = (userGuessOccurrences[userGuess[i]] || 0) + 1;
        }
    }

    for (const digit in userGuessOccurrences) {
        if (secretCodeOccurrences[digit]) {
            correctNumbers += Math.min(secretCodeOccurrences[digit], userGuessOccurrences[digit]);
        }
    }

    updateLatestGuessDisplay();

    if (correctPositions === maxGuessLength) {
        feedback.textContent = `Congratulations! You've guessed the correct code '${userGuess}'.`;
        feedback.style.color = 'green';
        stopTimer();
    } else {
        feedback.textContent = `${correctPositions} digits are correct and in the right position., ${correctNumbers} digits are correct but in the wrong position. Try again!`;
        feedback.style.color = 'orange';
    }
    
    clearGuess();
}

document.getElementById("return-button").onclick = function() {
    window.location.href = "game.html";
};
