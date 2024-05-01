document.addEventListener('DOMContentLoaded', function() {
    const preElement = document.querySelector('pre');
    
    function randomFlicker() {
        let flickerDuration = Math.random() * 1000 + 500; // Random duration between 500ms and 1500ms
        preElement.style.animationDuration = `${flickerDuration}ms`;
        setTimeout(randomFlicker, flickerDuration);
    }

    randomFlicker();
});

document.addEventListener('DOMContentLoaded', function() {
    setInterval(updateMemory, 2000);  // Calls updateMemory every 2 seconds
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
