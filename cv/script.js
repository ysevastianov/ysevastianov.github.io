document.addEventListener('DOMContentLoaded', function() {
    const screen = document.querySelector('.screen');
    setInterval(() => {
        screen.style.opacity = (screen.style.opacity == 0.9 ? 1 : 0.9);
    }, 500);
});

function updateMemory() {
    const memUsed = Math.floor(Math.random() * 300000) + 700000;
    const memFree = 1000000 - memUsed;
    const memOutput = `KiB Mem : 1000000 total, ${memFree} free, ${memUsed} used, 200000 buff/cache`;

    const preElement = document.getElementById('top-output');
    const lines = preElement.textContent.split('\n');
    lines[2] = memOutput;
    preElement.textContent = lines.join('\n');
}
