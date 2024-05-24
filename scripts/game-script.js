let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;

const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const exitButton = document.getElementById('exit-button');
const startScreen = document.getElementById('start-screen');
const gameContainer = document.getElementById('game-container');
const circle = document.getElementById('circle');
const scoreSpan = document.getElementById('score');
const timerSpan = document.getElementById('timer');

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
exitButton.addEventListener('click', exitGame);

function startGame() {
    startScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    resetGame();
    moveCircle();
    gameInterval = setInterval(moveCircle, 1000);
    timerInterval = setInterval(updateTimer, 1000);
}

function restartGame() {
    resetGame();
    moveCircle();
    gameInterval = setInterval(moveCircle, 1000);
    timerInterval = setInterval(updateTimer, 1000);
}

function exitGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    gameContainer.classList.add('hidden');
    startScreen.classList.remove('hidden');
}

function resetGame() {
    score = 0;
    timeLeft = 30;
    scoreSpan.textContent = `Score: ${score}`;
    timerSpan.textContent = `Time: ${timeLeft}`;
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    circle.removeEventListener('click', incrementScore);
    circle.addEventListener('click', incrementScore);
}

function moveCircle() {
    const containerRect = gameContainer.getBoundingClientRect();
    const maxX = containerRect.width - circle.clientWidth;
    const maxY = containerRect.height - circle.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    circle.style.left = `${randomX}px`;
    circle.style.top = `${randomY}px`;
}

function updateTimer() {
    timeLeft--;
    timerSpan.textContent = `Time: ${timeLeft}`;
    if (timeLeft === 0) {
        endGame();
    }
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    alert(`Game Over! Your score is ${score}`);
}

function incrementScore() {
    score++;
    scoreSpan.textContent = `Score: ${score}`;
}

function showGame(gameId) {
    var games = document.querySelectorAll('.game-container');
    games.forEach(function(game) {
        game.style.display = 'none';
    });

    var selectedGame = document.getElementById(gameId);
    if (selectedGame) {
        selectedGame.style.display = 'block';
    }
}

function redirectToGame(gameUrl) {
    window.location.href = gameUrl;
}

document.getElementById("return-button").onclick = function() {
    window.location.href = "game.html";
};