// Global variables
let wheelCanvas, ctx;
let wheelRotation = 0;
let isSpinning = false;
let spinInterval;
let spinHistory = [];
let currentMode = 'normal'; // 'normal' or 'elimination'

// DOM Elements
const elements = {
    minNumber: document.getElementById('minNumber'),
    maxNumber: document.getElementById('maxNumber'),
    excludeNumbers: document.getElementById('excludeNumbers'),
    normalMode: document.getElementById('normalMode'),
    eliminationMode: document.getElementById('eliminationMode'),
    spinButton: document.getElementById('spinButton'),
    spinButtonCenter: document.getElementById('spinButtonCenter'),
    clearButton: document.getElementById('clearButton'),
    resultDisplay: document.getElementById('resultDisplay'),
    historyList: document.getElementById('historyList'),
    wheelCanvas: document.getElementById('wheelCanvas'),
    particles: document.getElementById('particles'),
    confettiContainer: document.getElementById('confettiContainer')
};

// Initialize the application
function init() {
    setupCanvas();
    setupEventListeners();
    createParticles();
    updateModeButtons();
    loadSpinHistory();
}

// Set up canvas for the wheel
function setupCanvas() {
    wheelCanvas = elements.wheelCanvas;
    ctx = wheelCanvas.getContext('2d');
    
    // Set canvas size to match display size
    const displaySize = Math.min(wheelCanvas.parentElement.clientWidth, wheelCanvas.parentElement.clientHeight);
    wheelCanvas.width = displaySize;
    wheelCanvas.height = displaySize;
    
    drawWheel();
}

// Create background particles
function createParticles() {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 6}s`;
        particle.style.background = getRandomNeonColor();
        elements.particles.appendChild(particle);
    }
}

// Get random neon color for particles
function getRandomNeonColor() {
    const colors = ['#007bff', '#6f42c1', '#e83e8c', '#28a745'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Set up event listeners
function setupEventListeners() {
    // Mode buttons
    elements.normalMode.addEventListener('click', () => switchMode('normal'));
    elements.eliminationMode.addEventListener('click', () => switchMode('elimination'));
    
    // Spin buttons (both main and center)
    elements.spinButton.addEventListener('click', spinWheel);
    elements.spinButtonCenter.addEventListener('click', spinWheel);
    
    // Clear button
    elements.clearButton.addEventListener('click', clearAll);
    
    // Input validation
    [elements.minNumber, elements.maxNumber].forEach(input => {
        input.addEventListener('change', validateInputs);
    });
    
    // Window resize
    window.addEventListener('resize', () => {
        setupCanvas();
    });
}

// Validate input values
function validateInputs() {
    const min = parseInt(elements.minNumber.value);
    const max = parseInt(elements.maxNumber.value);
    
    if (min >= max) {
        elements.maxNumber.value = min + 1;
    }
}

// Switch between modes
function switchMode(mode) {
    currentMode = mode;
    updateModeButtons();
}

// Update mode button styles
function updateModeButtons() {
    elements.normalMode.classList.toggle('active', currentMode === 'normal');
    elements.eliminationMode.classList.toggle('active', currentMode === 'elimination');
}

// Clear all inputs and history
function clearAll() {
    elements.minNumber.value = 1;
    elements.maxNumber.value = 100;
    elements.excludeNumbers.value = '';
    spinHistory = [];
    updateHistoryDisplay();
    saveSpinHistory();
    elements.resultDisplay.querySelector('.result-value').textContent = '--';
    drawWheel();
}

// Get available numbers based on inputs
function getAvailableNumbers() {
    const min = parseInt(elements.minNumber.value);
    const max = parseInt(elements.maxNumber.value);
    const excludeInput = elements.excludeNumbers.value;
    
    let excludeNumbers = [];
    if (excludeInput) {
        excludeNumbers = excludeInput.split(',')
            .map(num => parseInt(num.trim()))
            .filter(num => !isNaN(num));
    }
    
    const numbers = [];
    for (let i = min; i <= max; i++) {
        if (!excludeNumbers.includes(i)) {
            numbers.push(i);
        }
    }
    
    return numbers;
}

// Spin the wheel
function spinWheel() {
    if (isSpinning) return;
    
    const availableNumbers = getAvailableNumbers();
    if (availableNumbers.length === 0) {
        alert('No valid numbers available! Please check your inputs.');
        return;
    }
    
    isSpinning = true;
    elements.spinButton.disabled = true;
    elements.spinButtonCenter.disabled = true;
    elements.resultDisplay.querySelector('.result-value').textContent = '--';
    
    // Generate random result
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const result = availableNumbers[randomIndex];
    
    // Calculate spin parameters
    const spinDuration = 3000; // 3 seconds
    const minSpins = 5; // Minimum number of spins
    const targetRotation = wheelRotation + (minSpins * 360) + (360 - ((result / availableNumbers.length) * 360));
    
    // Start spinning animation
    const startTime = Date.now();
    const spinAnimation = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);
        
        // Use easing function for realistic spin (fast start, slow end)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        wheelRotation = 0 + (targetRotation * easedProgress);
        
        drawWheel();
        
        if (progress < 1) {
            requestAnimationFrame(spinAnimation);
        } else {
            finishSpin(result);
        }
    };
    
    // Play spin sound
    playSpinSound();
    
    requestAnimationFrame(spinAnimation);
}

// Play spin sound
function playSpinSound() {
    // Create a simple spin sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 3);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 3);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 3);
    } catch (e) {
        console.log('Audio not supported');
    }
}

// Finish the spin and show result
function finishSpin(result) {
    isSpinning = false;
    elements.spinButton.disabled = false;
    elements.spinButtonCenter.disabled = false;
    
    // Update result display
    elements.resultDisplay.querySelector('.result-value').textContent = result;
    
    // Add to history
    addToHistory(result);
    
    // Show confetti
    createConfetti();
    
    // Play result sound
    playResultSound();
    
    // Handle elimination mode
    if (currentMode === 'elimination') {
        handleEliminationMode(result);
    }
}

// Handle elimination mode
function handleEliminationMode(result) {
    const currentExclude = elements.excludeNumbers.value;
    const separator = currentExclude ? ',' : '';
    elements.excludeNumbers.value = currentExclude + separator + result;
    validateInputs(); // Re-validate inputs after adding excluded number
}

// Add result to history
function addToHistory(result) {
    const timestamp = new Date().toLocaleTimeString();
    spinHistory.unshift({ number: result, timestamp, mode: currentMode });
    
    // Keep only last 10 results
    if (spinHistory.length > 10) {
        spinHistory = spinHistory.slice(0, 10);
    }
    
    updateHistoryDisplay();
    saveSpinHistory();
}

// Update history display
function updateHistoryDisplay() {
    elements.historyList.innerHTML = '';
    
    spinHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-number">${item.number}</div>
            <div class="history-time">${item.timestamp} (${item.mode})</div>
        `;
        elements.historyList.appendChild(historyItem);
    });
}

// Save spin history to localStorage
function saveSpinHistory() {
    localStorage.setItem('spinHistory', JSON.stringify(spinHistory));
}

// Load spin history from localStorage
function loadSpinHistory() {
    const savedHistory = localStorage.getItem('spinHistory');
    if (savedHistory) {
        spinHistory = JSON.parse(savedHistory);
        updateHistoryDisplay();
    }
}

// Play result sound
function playResultSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        console.log('Audio not supported');
    }
}

// Create confetti effect
function createConfetti() {
    elements.confettiContainer.style.display = 'block';
    elements.confettiContainer.innerHTML = '';
    
    const confettiCount = 150;
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '-10px';
        confetti.style.background = getRandomNeonColor();
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        
        elements.confettiContainer.appendChild(confetti);
    }
    
    // Hide confetti after animation completes
    setTimeout(() => {
        elements.confettiContainer.style.display = 'none';
    }, 5000);
}

// Draw the wheel
function drawWheel() {
    const centerX = wheelCanvas.width / 2;
    const centerY = wheelCanvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.9;
    
    // Clear canvas
    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    
    // Draw outer glow
    ctx.shadowColor = '#007bff';
    ctx.shadowBlur = 30;
    
    // Draw wheel background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(248, 249, 250, 0.9)');
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Get numbers for the wheel
    const availableNumbers = getAvailableNumbers();
    if (availableNumbers.length === 0) return;
    
    const sliceAngle = (Math.PI * 2) / availableNumbers.length;
    
    // Draw each slice
    for (let i = 0; i < availableNumbers.length; i++) {
        const startAngle = i * sliceAngle + (wheelRotation * Math.PI / 180);
        const endAngle = (i + 1) * sliceAngle + (wheelRotation * Math.PI / 180);
        
        // Create slice gradient
        const sliceGradient = ctx.createConicGradient(startAngle, centerX, centerY);
        sliceGradient.addColorStop(0, `hsl(${(i * 360 / availableNumbers.length) % 360}, 70%, 70%)`);
        sliceGradient.addColorStop(0.5, `hsl(${(i * 360 / availableNumbers.length + 60) % 360}, 80%, 80%)`);
        sliceGradient.addColorStop(1, `hsl(${(i * 360 / availableNumbers.length) % 360}, 70%, 70%)`);
        
        // Draw slice
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = sliceGradient;
        ctx.fill();
        
        // Draw slice border
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Draw number
        const numberAngle = startAngle + sliceAngle / 2;
        const textRadius = radius * 0.7;
        const textX = centerX + Math.cos(numberAngle) * textRadius;
        const textY = centerY + Math.sin(numberAngle) * textRadius;
        
        ctx.save();
        ctx.translate(textX, textY);
        ctx.rotate(numberAngle);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `${Math.max(12, radius / 15)}px Orbitron`;
        ctx.fillStyle = '#212529';
        ctx.shadowColor = '#007bff';
        ctx.shadowBlur = 5;
        ctx.fillText(availableNumbers[i], 0, 0);
        ctx.restore();
    }
    
    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.1, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = '#007bff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw center glow
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.05, 0, Math.PI * 2);
    const centerGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius * 0.05
    );
    centerGradient.addColorStop(0, '#007bff');
    centerGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = centerGradient;
    ctx.fill();
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', init);