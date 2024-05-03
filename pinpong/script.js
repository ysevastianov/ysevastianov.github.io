const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

let ballRadius = 10;
let x1 = canvas.width / 4; // Starting position for orange ball
let y1 = canvas.height / 2;
let dx1 = 2; // Speed and direction of orange ball
let dy1 = 2;

let x2 = (3 * canvas.width) / 4; // Starting position for blue ball
let y2 = canvas.height / 2;
let dx2 = -2; // Speed and direction of blue ball
let dy2 = 2;

function drawSquare() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(100, 100, 200, 200);
    ctx.fillStyle = 'blue';
    ctx.fillRect(100, 100, 100, 200); // Left half
    ctx.fillStyle = 'orange';
    ctx.fillRect(200, 100, 100, 200); // Right half
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x1, y1, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(x2, y2, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSquare();
    drawBall();

    // Ball 1 (Orange) movement and collision detection
    if (x1 + dx1 > 300 || x1 + dx1 < 100) {
        dx1 = -dx1;
    }
    if (y1 + dy1 > 300 || y1 + dy1 < 100) {
        dy1 = -dy1;
    }
    x1 += dx1;
    y1 += dy1;

    // Color the blue zone when orange ball touches it
    if (x1 <= 200 && x1 >= 100) {
        ctx.fillStyle = 'orange';
        ctx.fillRect(x1-ballRadius, y1-ballRadius, ballRadius*2, ballRadius*2);
    }

    // Ball 2 (Blue) movement and collision detection
    if (x2 + dx2 > 300 || x2 + dx2 < 100) {
        dx2 = -dx2;
    }
    if (y2 + dy2 > 300 || y2 + dy2 < 100) {
        dy2 = -dy2;
    }
    x2 += dx2;
    y2 += dy2;

    // Color the orange zone when blue ball touches it
    if (x2 >= 200 && x2 <= 300) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(x2-ballRadius, y2-ballRadius, ballRadius*2, ballRadius*2);
    }
}

setInterval(draw, 10);
