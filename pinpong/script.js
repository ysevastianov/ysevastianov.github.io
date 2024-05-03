const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

let ballRadius = 5;
let x1 = canvas.width / 4;
let y1 = canvas.height / 4;
let dx1 = 2;
let dy1 = -2;

let x2 = (3 * canvas.width) / 4;
let y2 = (3 * canvas.height) / 4;
let dx2 = -2;
let dy2 = 2;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x1, y1, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(x2, y2, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#DD9500";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    // Ball 1 movement
    if(x1 + dx1 > canvas.width-ballRadius || x1 + dx1 < ballRadius) {
        dx1 = -dx1;
        ctx.fillStyle = ctx.fillStyle === "#0095DD" ? "#DD9500" : "#0095DD";
    }
    if(y1 + dy1 > canvas.height-ballRadius || y1 + dy1 < ballRadius) {
        dy1 = -dy1;
        ctx.fillStyle = ctx.fillStyle === "#0095DD" ? "#DD9500" : "#0095DD";
    }
    x1 += dx1;
    y1 += dy1;

    // Ball 2 movement
    if(x2 + dx2 > canvas.width-ballRadius || x2 + dx2 < ballRadius) {
        dx2 = -dx2;
        ctx.fillStyle = ctx.fillStyle === "#DD9500" ? "#0095DD" : "#DD9500";
    }
    if(y2 + dy2 > canvas.height-ballRadius || y2 + dy2 < ballRadius) {
        dy2 = -dy2;
        ctx.fillStyle = ctx.fillStyle === "#DD9500" ? "#0095DD" : "#DD9500";
    }
    x2 += dx2;
    y2 += dy2;
}

setInterval(draw, 10);
