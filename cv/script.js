document.addEventListener('DOMContentLoaded', function() {
    const preElement = document.querySelector('pre');  // Consistently use 'pre' selector

    // Memory update interval set to 2 seconds
    setInterval(function() {
        updateMemory(preElement);  // Pass 'preElement' to the function
    }, 2000); 

    // Random flickering effect
    function randomFlicker() {
        let flickerDuration = Math.random() * 1000 + 500; // Random duration between 500ms and 1500ms
        preElement.style.animationDuration = `${flickerDuration}ms`;
        setTimeout(randomFlicker, flickerDuration);
    }
    randomFlicker();
});

// Define 'updateMemory' to accept 'preElement' as an argument
function updateMemory(preElement) {
    const memUsed = Math.floor(Math.random() * 300000) + 700000;
    const memFree = 1000000 - memUsed;
    const memOutput = `KiB Mem : 1000000 total, ${memFree} free, ${memUsed} used, 200000 buff/cache`;

    const lines = preElement.textContent.split('\n');
    lines[2] = memOutput;
    preElement.textContent = lines.join('\n');
}
