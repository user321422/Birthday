// Countdown Timer
function updateCountdown() {
    // Nepal is UTC+5:45
    const targetDate = new Date('2025-06-14T12:00:00+05:45'); // 1st of Asar 2082 in Gregorian calendar
    const currentDate = new Date();

    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
        startCelebration();
        return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // If we're close to zero, start pre-completion effects
    if (timeDifference < 10000) { // Last 10 seconds
        document.querySelector('.countdown-container').classList.add('completing');
    }
}

// Celebration and reveal functions
function startCelebration() {
    // Add completion class to time blocks
    document.querySelectorAll('.time-block').forEach(block => {
        block.classList.add('completed');
    });

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
        // Start the reveal sequence
        setTimeout(revealBirthdayContent, 1500);
    }, 500);
}

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

function revealBirthdayContent() {
    const countdownSection = document.getElementById('countdown-section');
    const birthdayContent = document.getElementById('birthday-content');

    // Fade out countdown
    countdownSection.style.animation = 'fadeOut 1s forwards';
    
    // Show birthday content with delay
    setTimeout(() => {
        countdownSection.style.display = 'none';
        birthdayContent.style.display = 'block';
        birthdayContent.classList.add('revealed');
        
        // Reveal sections one by one
        document.querySelectorAll('#birthday-content section').forEach((section, index) => {
            section.classList.add('section-reveal');
            setTimeout(() => {
                section.classList.add('visible');
            }, index * 800);
        });

        document.title = 'Happy Birthday! 🎉';
    }, 1000);
}

// Function to restore countdown
function restoreCountdown() {
    document.getElementById('birthday-content').style.display = 'none';
    document.getElementById('countdown-section').style.display = 'flex';
    document.title = 'For My Love ❤️';
    document.querySelector('.restore-button').style.display = 'none';
}

// Preview functionality
document.addEventListener('DOMContentLoaded', () => {
    const previewButton = document.getElementById('preview-button');
    
    // Create restore button if it doesn't exist
    let restoreButton = document.querySelector('.restore-button');
    if (!restoreButton) {
        restoreButton = document.createElement('button');
        restoreButton.className = 'restore-button';
        restoreButton.textContent = 'Return to Countdown 🔙';
        document.body.appendChild(restoreButton);
    }

    previewButton.addEventListener('click', startCelebration);

    restoreButton.addEventListener('click', () => {
        // Remove celebration overlay
        const overlay = document.querySelector('.celebration-overlay');
        if (overlay) overlay.remove();
        
        // Reset all animations
        document.querySelectorAll('.time-block').forEach(block => {
            block.classList.remove('completed');
        });
        document.querySelector('.countdown-container').classList.remove('completing');
        
        // Restore countdown
        restoreCountdown();
    });

    // Check initial state
    const targetDate = new Date('2025-06-14T12:00:00+05:45');
    const currentDate = new Date();
    
    if (currentDate >= targetDate) {
        startCelebration();
    }
});

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Card selection function
function cardSelected(card) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(c => {
        if (c !== card) {
            c.classList.add('fade-out');
        }
    });
    card.classList.add('show');
}

