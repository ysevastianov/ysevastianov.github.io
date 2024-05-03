const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;  // Adjust size to fit 100x100 grid (each cell 5x5 pixels)
canvas.height = 500;

const gridSize = 100; // 100x100 grid
const cellSize = canvas.width / gridSize; // Each cell size
const grid = new Array(gridSize);

// Initialize grid with colors
for (let i = 0; i < gridSize; i++) {
    grid[i] = new Array(gridSize).fill(i < gridSize / 2 ? 'blue' : 'orange');
}

const ballRadius = 5;
const balls = [
    { x: 125, y: 250, dx: 2, dy: 2, color: 'orange' },
    { x: 375, y: 250, dx: -2, dy: -2, color: 'blue' }
];

function drawGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            ctx.fillStyle = grid[i][j];
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }
}

function drawBalls() {
    balls.forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    });
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawBalls();

    balls.forEach(ball => {
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x + ballRadius > canvas.width || ball.x - ballRadius < 0) {
            ball.dx = -ball.dx;
        }
        if (ball.y + ballRadius > canvas.height || ball.y - ballRadius < 0) {
            ball.dy = -ball.dy;
        }

        // Check for collision with grid squares
        let gridX = Math.floor(ball.x / cellSize);
        let gridY = Math.floor(ball.y / cellSize);

        if (grid[gridX][gridY] !== ball.color) {
            grid[gridX][gridY] = ball.color;
        }
    });
}

setInterval(updateGame, 10);
