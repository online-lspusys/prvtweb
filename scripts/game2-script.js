const cards = Array.from({ length: 16 }, (_, i) => i + 1);
let shuffledCards = [];
let correctOrder = 1;
let gameStarted = false;
let lockBoard = false;
let startTime;
let timerInterval;
let elapsedTime = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startGame() {
  const startBtn = document.getElementById('start-screen');
  startBtn.style.display = 'none';
  const gameBoard = document.getElementById('game-board');
  gameBoard.style.display = 'flex';
  shuffledCards = shuffle([...cards]);
  gameStarted = true;
  startTime = Date.now(); 
  timerInterval = setInterval(updateTimer, 1000); 
  document.getElementById('timer').style.display = 'block'; 

  for (let i = 0; i < shuffledCards.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = i;
    card.textContent = '';
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  }

  const buttonsContainer = document.getElementById('buttons-container');
  buttonsContainer.style.display = 'block';
}

function restartGame() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  clearInterval(timerInterval);
  document.getElementById('timer').textContent = '00:00';
  correctOrder = 1;
  startGame();
}

function exitGame() {
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';

  const startBtn = document.getElementById('start-screen');
  startBtn.style.display = 'inline-block';
  startBtn.style.position = 'absolute';
  startBtn.style.top = '50%';
  startBtn.style.left = '50%';
  startBtn.style.transform = 'translate(-50%, -50%)';

  const buttonsContainer = document.getElementById('buttons-container');
  buttonsContainer.style.display = 'none';
  clearInterval(timerInterval);
  document.getElementById('timer').textContent = '00:00';
  document.getElementById('timer').style.display = 'none';
  gameStarted = false;
}

function flipCard() {
  if (!gameStarted || lockBoard) return;

  const cardIndex = this.dataset.index;

  if (this.textContent === '') {
    this.textContent = shuffledCards[cardIndex];
    if (shuffledCards[cardIndex] === correctOrder) {
      correctOrder++;
      if (correctOrder > cards.length) {
        setTimeout(() => {
          alert('Congratulations! You won!');
        }, 500);
      }
    } else {
      lockBoard = true;
      setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => card.textContent = '');
        correctOrder = 1;
        lockBoard = false;
      }, 500);
    }
  }
}

function updateTimer() {
  const currentTime = Date.now();
  elapsedTime = Math.floor((currentTime - startTime) / 1000);
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById('timer').textContent = formattedTime;
}

document.getElementById("return-button").onclick = function() {
  window.location.href = "game.html";
};

document.getElementById('timer').style.display = 'none';
