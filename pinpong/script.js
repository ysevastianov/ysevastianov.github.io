const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const ballRadius = 10;
const dx = 2;
const dy = 2;

// Ball properties
const balls = [
    { x: 150, y: 200, dx: dx, dy: dy, color: 'orange' }, // Orange ball in blue area
    { x: 250, y: 200, dx: -dx, dy: -dy, color: 'blue' }   // Blue ball in orange area
];

// Draw the initial split square
function drawSquare() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height); // Left half (blue)
    ctx.fillStyle = 'orange';
    ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height); // Right half (orange)
}

// Function to draw balls
function drawBalls() {
    balls.forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    });
}

// Function to update the game state
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSquare();
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

        // Pixel color collision detection and change
        const pixel = ctx.getImageData(ball.x, ball.y, 1, 1).data;
        const pixelColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;

        if ((pixelColor === 'rgb(0, 0, 255)' && ball.color === 'orange') || // Blue and orange ball
            (pixelColor === 'rgb(255, 165, 0)' && ball.color === 'blue')) { // Orange and blue ball
            ctx.fillStyle = ball.color;
            ctx.fillRect(ball.x - ballRadius, ball.y - ballRadius, ballRadius * 2, ballRadius * 2);
        }
    });
}

setInterval(updateGame, 10);
