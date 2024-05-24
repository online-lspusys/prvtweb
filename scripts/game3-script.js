document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const scoreDisplay = document.getElementById('floating-score');
    const scoreText = document.getElementById('score-text');
    const okButton = document.getElementById('ok-button');
    
    const gridSize = 5;
    const bombCount = 5;
    let bombs = [];
    let clickedBoxes = 0;

    function createGrid() {
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                const box = document.createElement('div');
                box.classList.add('box');
                box.dataset.row = i;
                box.dataset.col = j;
                box.innerText = '';
                container.appendChild(box);
            }
        }
    }

    function placeBombs() {
        while (bombs.length < bombCount) {
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);
            const bomb = { row, col };

            if (!bombs.some(b => b.row === bomb.row && b.col === bomb.col)) {
                bombs.push(bomb);
            }
        }
    }

    function countAdjacentBombs(row, col) {
        let count = 0;
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i >= 0 && i < gridSize && j >= 0 && j < gridSize && !(i === row && j === col)) {
                    if (bombs.some(b => b.row === i && b.col === j)) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    function revealBox(row, col) {
        const boxes = document.querySelectorAll('.box');
        const index = row * gridSize + col;
        const box = boxes[index];
        box.innerText = '🪙';
        box.style.backgroundColor = 'black';
        box.removeEventListener('click', handleClick);
        clickedBoxes++;
        calculateScore();
    }

    function revealBomb(row, col) {
        const boxes = document.querySelectorAll('.box');
        boxes.forEach(box => {
            const boxRow = parseInt(box.dataset.row);
            const boxCol = parseInt(box.dataset.col);
            if (bombs.some(b => b.row === boxRow && b.col === boxCol)) {
                box.innerText = '💣';
                box.style.backgroundColor = 'red';
            }
            box.removeEventListener('click', handleClick);
        });
        scoreDisplay.classList.remove('hidden');
        calculateScore();
        alert('Game Over! You clicked on a bomb!');
    }

    function handleClick(event) {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);

        if (bombs.some(b => b.row === row && b.col === col)) {
            revealBomb(row, col);
        } else {
            revealBox(row, col);
        }
    }

    function calculateScore() {
        scoreText.innerText = `Your score: ${clickedBoxes}`;
    }

    function restartGame() {
        container.style.display = 'grid';
        bombs = [];
        clickedBoxes = 0;
        placeBombs();
        const boxes = document.querySelectorAll('.box');
        boxes.forEach(box => {
            box.addEventListener('click', handleClick);
            box.style.backgroundColor = '';
            box.innerText = '';
        });
    }
    
    function exitGame() {
        document.getElementById('start-screen').style.display = 'block';
        document.getElementById('container').style.display = 'none';
    }

    createGrid();
    placeBombs();

    okButton.addEventListener("click", function() {
        scoreDisplay.classList.add('hidden');
    });

    document.getElementById('start-button').addEventListener('click', function() {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('container').style.display = 'grid';
    });

    document.getElementById('restart-button').addEventListener('click', restartGame);

    document.getElementById('exit-button').addEventListener('click', exitGame);

    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.addEventListener('click', handleClick);
    });
});

document.getElementById("return-button").onclick = function() {
    window.location.href = "game.html";
  };
