document.addEventListener('DOMContentLoaded', function() {
    const screen = document.querySelector('.screen');

    function randomBlink() {
        let randomTime = Math.random() * 3000 + 500; // Random time between 500ms and 3500ms
        screen.style.animationDuration = `${randomTime}ms`;
        setTimeout(randomBlink, randomTime);
    }

    randomBlink();
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
