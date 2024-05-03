const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;  // Size of canvas remains
canvas.height = 500;

const gridCols = 40; // Total number of columns (20 per half)
const gridRows = 20; // Total number of rows
const cellSize = canvas.width / gridCols; // Each cell size adjusted

const grid = new Array(gridRows).fill(null).map(() => new Array(gridCols).fill('blue').fill('orange', gridCols / 2));

const objectSize = cellSize; // Objects are now the same size as cells
const balls = [
    { x: objectSize * 10, y: objectSize * 10, dx: 2, dy: 2, color: 'orange', targetColor: 'blue' },
    { x: objectSize * 30, y: objectSize * 10, dx: -2, dy: -2, color: 'blue', targetColor: 'orange' }
];

function drawGrid() {
    for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
            ctx.fillStyle = grid[i][j];
            ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
}

function drawBalls() {
    balls.forEach(ball => {
        ctx.fillStyle = ball.color;
        ctx.fillRect(ball.x, ball.y, objectSize, objectSize); // Draw square objects instead of balls
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

setInterval(updateGame, 10);
