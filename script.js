// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    { x: 10, y: 10 }
];

let food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
};

let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gamePaused = false;
let gameLoop;

// Color scheme
const colors = {
    background: '#1a1a2e',
    snake: '#00ff00',
    snakeHead: '#00cc00',
    food: '#ff3333',
    grid: '#2a2a4e'
};

// DOM elements
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const gameOverMessage = document.getElementById('gameOverMessage');
const finalScoreDisplay = document.getElementById('finalScore');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

// Initialize
highScoreDisplay.textContent = highScore;

// Event listeners
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
resetBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', startGame);
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(e) {
    if (!gameRunning || gamePaused) return;

    switch(e.key) {
        case 'ArrowUp':
            if (direction.y === 0) nextDirection = { x: 0, y: -1 };
            e.preventDefault();
            break;
        case 'ArrowDown':
            if (direction.y === 0) nextDirection = { x: 0, y: 1 };
            e.preventDefault();
            break;
        case 'ArrowLeft':
            if (direction.x === 0) nextDirection = { x: -1, y: 0 };
            e.preventDefault();
            break;
        case 'ArrowRight':
            if (direction.x === 0) nextDirection = { x: 1, y: 0 };
            e.preventDefault();
            break;
    }
}

function startGame() {
    gameRunning = true;
    gamePaused = false;
    gameOverMessage.classList.add('hidden');
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    gameLoop = setInterval(update, 100);
}

function togglePause() {
    if (!gameRunning) return;
    gamePaused = !gamePaused;
    pauseBtn.textContent = gamePaused ? 'Resume' : 'Pause';
}

function resetGame() {
    gameRunning = false;
    gamePaused = false;
    clearInterval(gameLoop);
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    scoreDisplay.textContent = score;
    gameOverMessage.classList.add('hidden');
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
    draw();
}

function update() {
    if (gamePaused) return;

    // Update direction
    direction = nextDirection;

    // Calculate new head position
    const head = snake[0];
    const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y
    };

    // Check wall collision
    if (newHead.x < 0 || newHead.x >= tileCount || 
        newHead.y < 0 || newHead.y >= tileCount) {
        endGame();
        return;
    }

    // Check self collision
    if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        endGame();
        return;
    }

    // Add new head
    snake.unshift(newHead);

    // Check food collision
    if (newHead.x === food.x && newHead.y === food.y) {
        score += 10;
        scoreDisplay.textContent = score;
        generateFood();
    } else {
        // Remove tail if no food eaten
        snake.pop();
    }

    draw();
}

function generateFood() {
    let newFood;
    let validPosition = false;

    while (!validPosition) {
        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };

        validPosition = !snake.some(segment => 
            segment.x === newFood.x && segment.y === newFood.y
        );
    }

    food = newFood;
}

function draw() {
    // Draw background
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = colors.food;
    ctx.beginPath();
    ctx.arc(food.x * gridSize + gridSize / 2, 
            food.y * gridSize + gridSize / 2, 
            gridSize / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? colors.snakeHead : colors.snake;
        ctx.fillRect(segment.x * gridSize + 1, 
                     segment.y * gridSize + 1, 
                     gridSize - 2, 
                     gridSize - 2);
    });
}

function endGame() {
    gameRunning = false;
    clearInterval(gameLoop);
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreDisplay.textContent = highScore;
    }

    finalScoreDisplay.textContent = score;
    gameOverMessage.classList.remove('hidden');
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Pause';
}

// Initial draw
draw();
