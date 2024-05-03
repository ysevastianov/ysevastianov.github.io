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

// Function to apply a simple fisheye effect
function applyFisheye() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = width;
    tempCanvas.height = height;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dx = x / width - 0.5;
            const dy = y / height - 0.5;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            const r = Math.pow(distance, 0.8);
            const sx = Math.cos(angle) * r * width + width / 2;
            const sy = Math.sin(angle) * r * height + height / 2;
            const i = (y * width + x) * 4;
            const si = (Math.floor(sy) * width + Math.floor(sx)) * 4;
            data[i] = data[si];
            data[i + 1] = data[si + 1];
            data[i + 2] = data[si + 2];
        }
    }

    tempCtx.putImageData(imageData, 0, 0);
    ctx.drawImage(tempCanvas, 0, 0);
}

// Apply the fisheye effect
applyFisheye();

const ballRadius = 4;
const balls = [
    { x: 44, y: 55, dx: 2, dy: 2, color: 'black', targetColor: 'lime' },
    { x: 155, y: 40, dx: -2, dy: -2, color: 'lime', targetColor: 'black' }
];

function drawGrid() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            ctx.fillStyle = grid[i][j];
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }
}

/*function drawBalls() {
    balls.forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    });
}*/

// Drawing balls with flickering effect
function drawBalls() {
    balls.forEach(ball => {
        if (ball.color === 'lime') {
            ctx.shadowColor = 'lime';
            ctx.shadowBlur = 20; // Flickering effect shadow
        }
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
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
