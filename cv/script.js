document.addEventListener('DOMContentLoaded', function() {
    const preElement = document.querySelector('pre');

    // Update memory every 2 seconds
    setInterval(function() {
        updateMemory(preElement);
    }, 2000);

    // Start the random flickering effect
    randomFlicker();

    function randomFlicker() {
        let flickerDuration = Math.random() * 3000 + 1000; // Random duration between 1000ms and 4000ms
        preElement.style.animationDuration = `${flickerDuration}ms`;
        setTimeout(randomFlicker, flickerDuration);
    }
});

function updateMemory(preElement) {
    const memUsed = Math.floor(Math.random() * 300000) + 700000;
    const memFree = 1000000 - memUsed;
    const memOutput = `KiB Mem : 1000000 total, ${memFree} free, ${memUsed} used, 200000 buff/cache`;

    const lines = preElement.textContent.split('\n');
    if (lines.length > 2) {  // Check if the specific line exists
        lines[2] = memOutput;
        preElement.textContent = lines.join('\n');
    } else {
        console.log("Error: Specified line for memory status not found.");
    }
}
