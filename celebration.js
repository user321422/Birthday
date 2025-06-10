// Celebration effects
function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDelay = `${Math.random() * 2}s`;
    container.appendChild(sparkle);
}

function createConfetti(container) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = '-10px';
    confetti.style.setProperty('--confetti-color', getRandomColor());
    confetti.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(confetti);
    setTimeout(() => confetti.classList.add('show'), 100);
}

function getRandomColor() {
    const colors = [
        '#ff69b4', '#ff1493', '#ff69b4', '#dda0dd', '#da70d6',
        '#ba55d3', '#9370db', '#8a2be2', '#9400d3', '#9932cc'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Start celebration when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Create celebration overlay
    const overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    document.body.appendChild(overlay);

    // Create sparkles
    for (let i = 0; i < 50; i++) {
        createSparkle(overlay);
    }

    // Create confetti
    for (let i = 0; i < 100; i++) {
        createConfetti(overlay);
    }

    // Show overlay with effects
    setTimeout(() => {
        overlay.classList.add('show');
    }, 500);
}); 