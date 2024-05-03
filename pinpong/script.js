const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 200;  // Size of canvas - each cell being 5x5 for a 100x100 grid
canvas.height = 200;

const gridSize = 20; // Number of cells in one row/column
const cellSize = canvas.width / gridSize; // Size of each cell in pixels
const grid = new Array(gridSize);

// Initialize the grid with alternating colors
for (let i = 0; i < gridSize; i++) {
    grid[i] = new Array(gridSize).fill(i < gridSize / 2 ? 'lime' : 'black');
}

/*const ballRadius = 4;
const balls = [
    { x: 44, y: 55, dx: 2, dy: 2, color: 'black', targetColor: 'lime' },
    { x: 155, y: 40, dx: -2, dy: -2, color: 'lime', targetColor: 'black' }
];*/


const balls = [
    { x: 4, y: 5, dx: 1, dy: 1, color: 'black', targetColor: 'lime' }, // Use cell indices instead of pixel values
    { x: 15, y: 4, dx: -1, dy: -1, color: 'lime', targetColor: 'black' }
];

function drawGrid() {
    const borderWidth = 1; // Define the effective border width
    const adjustedCellSize = cellSize - borderWidth * 2; // Adjust cell size to account for border

    // Assuming the background of the canvas is set to black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const x = i * cellSize + borderWidth;
            const y = j * cellSize + borderWidth;

            // Fill the cell with color, leaving space for the black border
            ctx.fillStyle = grid[i][j];
            ctx.fillRect(x, y, adjustedCellSize, adjustedCellSize);
        }
    }
}

// Drawing balls with flickering effect
function drawBalls() {
    balls.forEach(ball => {
        const x = ball.x * cellSize; // Convert cell coordinates to pixel coordinates
        const y = ball.y * cellSize;
        ctx.beginPath();
        ctx.fillRect(x, y, cellSize, cellSize); // Draw the square ball
        /*ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);*/
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0; // Reset shadow blur after drawing
    });
}

// Optionally apply blur using canvas context directly
ctx.filter = 'blur(0.5px)';
// Draw elements that need blurring
ctx.filter = 'none'; // Reset filter after use

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawBalls();

    balls.forEach(ball => {
        // Move the balls
        ball.x += ball.dx;
        ball.y += ball.dy;

        /*// Wall collision detection
        if (ball.x + ballRadius > canvas.width || ball.x - ballRadius < 0) {
            ball.dx = -ball.dx;
        }
        if (ball.y + ballRadius > canvas.height || ball.y - ballRadius < 0) {
            ball.dy = -ball.dy;
        }*/
        // Boundary checks to keep within the grid
        if (ball.x >= gridSize || ball.x < 0) {
            ball.dx = -ball.dx;
            ball.x += ball.dx;
        }
        if (ball.y >= gridSize || ball.y < 0) {
            ball.dy = -ball.dy;
            ball.y += ball.dy;
        }
        grid[ball.y][ball.x] = ball.color;

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
