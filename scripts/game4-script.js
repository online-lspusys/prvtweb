const questions = [
    {
        question: "What is the result of 68 + 86?",
        options: ["154", "134", "168", "144"],
        answer: "154"
    },
    {
        question: "What is the square root of 625?",
        options: ["23", "25", "27", "29"],
        answer: "25"
    },
    {
        question: "Find the missing terms 18, 20, 24, _, 38",
        options: ["26", "28", "30", "32"],
        answer: "30"
    },
    {
        question: "What is 15% of 200?",
        options: ["25", "30", "35", "40"],
        answer: "30"
    },
    {
        question: "Solve for x: 2x + 3 = 7",
        options: ["1", "2", "3", "4"],
        answer: "2"
    },
    {
        question: "Convert 0.75 to a fraction.",
        options: ["1/2", "3/4", "2/3", "4/5"],
        answer: "3/4"
    },
    {
        question: "What is the next prime number after 11?",
        options: ["13", "15", "17", "19"],
        answer: "13"
    },
    {
        question: "What is the greatest common divisor (GCD) of 24 and 36?",
        options: ["6", "8", "12", "18"],
        answer: "12"
    },
    {
        question: "What is the perimeter of a rectangle with length 8 and width 5?",
        options: ["26", "30", "40", "32"],
        answer: "26"
    },
    {
        question: "What is the sum of the interior angles of a triangle?",
        options: ["90 degrees", "180 degrees", "270 degrees", "360 degrees"],
        answer: "180 degrees"
    },
    {
        question: "If a circle has a radius of 7, what is its diameter?",
        options: ["7", "14", "21", "28"],
        answer: "14"
    },
    {
        question: "Solve for y: 3y - 9 = 0",
        options: ["1", "2", "3", "4"],
        answer: "3"
    },
    {
        question: "What is the cube root of 27?",
        options: ["2", "3", "4", "5"],
        answer: "3"
    },
    {
        question: "What is the hypotenuse of a right triangle with legs of length 3 and 4?",
        options: ["5", "6", "7", "8"],
        answer: "5"
    },
    {
        question: "What is the least common multiple (LCM) of 4 and 5?",
        options: ["10", "15", "20", "25"],
        answer: "20"
    },
    
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Pt", "Pb"],
        answer: "Au"
    },
    {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
        answer: "Mitochondria"
    },
    {
        question: "What is the acceleration due to gravity on Earth?",
        options: ["9.8 m/s²", "8.9 m/s²", "10.2 m/s²", "7.9 m/s²"],
        answer: "9.8 m/s²"
    },
    {
        question: "What is the chemical formula for water?",
        options: ["H2O", "O2", "CO2", "H2SO4"],
        answer: "H2O"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    
    {
        question: "What does RAM stand for in computer terms?",
        options: ["Read Access Memory", "Random Access Memory", "Run Access Memory", "Readily Available Memory"],
        answer: "Random Access Memory"
    },
    {
        question: "What is the primary purpose of a CPU in a computer?",
        options: ["To store data", "To manage input/output devices", "To execute instructions", "To provide power"],
        answer: "To execute instructions"
    },
    {
        question: "Which of the following is a programming language?",
        options: ["HTML", "Python", "SQL", "XML"],
        answer: "Python"
    },
    {
        question: "What is the output of the following code snippet in Python?\n```python\nprint(3 + 4 * 2)\n```",
        options: ["14", "11", "10", "7"],
        answer: "11"
    },
    {
        question: "What does 'HTML' stand for?",
        options: ["HyperText Markup Language", "HighText Machine Language", "HyperText Markdown Language", "HyperTransfer Markup Language"],
        answer: "HyperText Markup Language"
    },
    
    {
        question: "What does CAD stand for?",
        options: ["Computer-Aided Design", "Computer Advanced Drawing", "Complex Algorithm Design", "Computer Aided Drawing"],
        answer: "Computer-Aided Design"
    },
    {
        question: "In CAD software, what is a common file format for 3D models?",
        options: ["PDF", "DOCX", "DWG", "JPEG"],
        answer: "DWG"
    },
    {
        question: "Which tool in CAD software is commonly used to create a circle?",
        options: ["Line Tool", "Arc Tool", "Ellipse Tool", "Circle Tool"],
        answer: "Circle Tool"
    },
    {
        question: "What is the function of the 'Extrude' tool in CAD?",
        options: ["To create a 2D shape", "To rotate a shape", "To convert a 2D shape into a 3D object", "To measure distances"],
        answer: "To convert a 2D shape into a 3D object"
    },
    {
        question: "Which command is used to measure the distance between two points in CAD software?",
        options: ["Distance", "Measure", "Length", "Radius"],
        answer: "Distance"
    }
];


let selectedQuestions = [];
let currentQuestion = 0;
let score = 0;
let timer;

document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const restartButton = document.getElementById('restart');
    const exitButton = document.getElementById('exit');
    const resultElement = document.getElementById('result');
    const timerElement = document.getElementById('timer');
    const readyMessageElement = document.getElementById('ready-message');

    document.getElementById('start-button').addEventListener('click', function() {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        document.getElementById('buttons-container').style.display = 'block';
        showReadyMessage();
    });

    document.getElementById('return-button').addEventListener('click', function() {
        document.getElementById('start-screen').style.display = 'block';
        document.getElementById('game-container').style.display = 'none';
    });

    restartButton.addEventListener('click', restartQuiz);
    exitButton.addEventListener('click', exitQuiz);

    function startQuiz() {
        selectedQuestions = shuffleArray(questions).slice(0, 5);
        currentQuestion = 0;
        score = 0;
        loadQuestion();
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function loadQuestion() {
        const q = selectedQuestions[currentQuestion];
        questionElement.textContent = q.question;
        optionsElement.innerHTML = '';
        q.options.forEach((opt) => {
            const option = document.createElement('button');
            option.textContent = opt;
            option.value = opt;
            option.addEventListener('click', () => chooseOption(opt));
            optionsElement.appendChild(option);
        });
        startTimer();
    }

    function showReadyMessage() {
        readyMessageElement.textContent = "Please be ready:";
        readyMessageElement.style.display = 'block';
        let countdown = 3;
        const countdownInterval = setInterval(() => {
            if (countdown === 0) {
                clearInterval(countdownInterval);
                readyMessageElement.style.display = 'none';
                startQuiz();
            } else {
                readyMessageElement.textContent = `Please be ready: ${countdown}`;
                countdown--;
            }
        }, 1000);
    }

    function startTimer() {
        let timeLeft = 15;
        timerElement.textContent = `Time left: ${timeLeft} seconds`;
        timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                checkAnswer();
            } else {
                timeLeft--;
                timerElement.textContent = `Time left: ${timeLeft} seconds`;
            }
        }, 1000);
    }

    function chooseOption(option) {
        clearInterval(timer);
        checkAnswer(option);
    }

    function checkAnswer(selectedOption) {
        const correctAnswer = selectedQuestions[currentQuestion].answer;
        if (selectedOption === correctAnswer) {
            score++;
        }
        nextQuestion();
    }

    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion < selectedQuestions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        resultElement.textContent = `Your score: ${score} out of ${selectedQuestions.length}`;
        timerElement.textContent = '';
    }

    function restartQuiz() {
        clearInterval(timer);
        showReadyMessage();
    }

    function exitQuiz() {
        clearInterval(timer);
        questionElement.textContent = '';
        optionsElement.innerHTML = '';
        timerElement.textContent = '';
        resultElement.textContent = '';
        document.getElementById('start-screen').style.display = 'block';
        document.getElementById('game-container').style.display = 'none';
    }
});

document.getElementById("return-button").onclick = function() {
    window.location.href = "game.html";
  };
