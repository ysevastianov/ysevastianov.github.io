const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 200;  // Size of canvas - each cell being 5x5 for a 100x100 grid
canvas.height = 200;

const gridSize = 20; // Number of cells in one row/column
const cellSize = canvas.width / gridSize; // Size of each cell in pixels
const grid = new Array(gridSize);

// Initialize the grid with alternating colors
for (let i = 0; i < gridSize; i++) {
    grid[i] = new Array(gridSize).fill(i < gridSize / 2 ? 'blue' : 'orange');
}

const ballRadius = 4;
const balls = [
    { x: 44, y: 55, dx: 2, dy: 2, color: 'orange', targetColor: 'blue' },
    { x: 155, y: 40, dx: -2, dy: -2, color: 'blue', targetColor: 'orange' }
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
        // Move the balls
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Wall collision detection
        if (ball.x + ballRadius > canvas.width || ball.x - ballRadius < 0) {
            ball.dx = -ball.dx;
        }
        if (ball.y + ballRadius > canvas.height || ball.y - ballRadius < 0) {
            ball.dy = -ball.dy;
        }

        // Check for collision with grid squares
        let gridX = Math.floor(ball.x / cellSize);
        let gridY = Math.floor(ball.y / cellSize);

        // Change the color of the grid square if it matches the target color of the ball
        if (grid[gridX][gridY] === ball.color) {
            grid[gridX][gridY] = ball.targetColor;  // Change to ball's color

            ball.dx = -ball.dx;
            /*ball.dy = -ball.dy;*/
        }
        
    });
}

setInterval(updateGame, 20);
