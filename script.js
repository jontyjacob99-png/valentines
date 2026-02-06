// CONFIG: Edit these at the top for easy customization
const CONFIG = {
    timings: {
        scene1Text1Duration: 3000,  // ms: First text display
        scene1GlobeMove: 2800,     // ms: Globes moving closer
        scene1HugHold: 8000,       // ms: Total hug scene hold from hug start
        scene2Text1Duration: 2500, // ms: First text in scene 2
        scene2Text2Duration: 1500, // ms: Second text in scene 2
        fadeDuration: 600,         // ms: Fade transitions
    },
    textLines: {
        scene1Text1: "Even though we are so far apart, you always keep me close.",
        scene1Text2: "I love you more than you love PUTTU AND KADALA",
        scene2Text1: "I KNOW YOURE MY VALENTINE, NOW AND FORVER.",
        scene2Text2: "BUT STILL",
        question: "WILL YOU BE MY VALENTINE CHAKARE?",
        finalMessage: "HAPPY VALENTINES DAY BUBU 💛😘",
    },
    facePaths: {
        me: "assets/faces/me.png",
        her: "assets/faces/her.png",
    },
    collageImages: [
        "assets/collage/1.jpg",
        "assets/collage/2.jpg",
        "assets/collage/3.jpg",
        "assets/collage/4.jpg",
        "assets/collage/5.jpg",
        "assets/collage/6.jpg",
        "assets/collage/7.jpg",
        "assets/collage/8.jpg",
        "assets/collage/9.jpg",
        "assets/collage/10.jpg",
        "assets/collage/11.jpg",
        "assets/collage/12.jpg",
    ],
};

// State management
let currentScene = 0;
const scenes = document.querySelectorAll('.scene');

// Utility: Add event listener for pointerdown and click
function addInteraction(element, callback) {
    element.addEventListener('pointerdown', callback);
    element.addEventListener('click', callback);
}

// Scene transitions
function switchScene(toScene) {
    scenes[currentScene].classList.add('fade-out');
    setTimeout(() => {
        scenes[currentScene].classList.remove('active', 'fade-out');
        currentScene = toScene;
        scenes[currentScene].classList.add('active');
    }, CONFIG.timings.fadeDuration);
}

// Confetti function (no external libs)
function launchConfetti(numPieces, duration) {
    const layer = document.getElementById('confettiLayer');
    for (let i = 0; i < numPieces; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        piece.style.animationDelay = Math.random() * 2 + 's';
        piece.style.animationDuration = duration / 1000 + 's';
        layer.appendChild(piece);
        setTimeout(() => piece.remove(), duration);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // SCENE 0: Start
    addInteraction(document.querySelector('.start-button'), () => switchScene(1));

    // SCENE 1: Long Distance
    const scene1Text = document.querySelector('#scene1 .text-overlay');
    const indiaGlobe = document.querySelector('.globe.india');
    const usaGlobe = document.querySelector('.globe.usa');
    const herChar = document.querySelector('.char-sprite.her');
    const meChar = document.querySelector('.char-sprite.me');
    const heart = document.querySelector('.heart');

    setTimeout(() => {
        scene1Text.textContent = CONFIG.textLines.scene1Text1;
        scene1Text.style.opacity = 1;
        setTimeout(() => {
            scene1Text.style.opacity = 0;
            // Move globes closer
            indiaGlobe.style.left = '40%';
            usaGlobe.style.right = '40%';
            setTimeout(() => {
                // Show heart and hug
                heart.style.display = 'block';
                herChar.style.transform = 'translateX(20px) rotate(8deg)';
                meChar.style.transform = 'translateX(-20px) rotate(-8deg)';
                scene1Text.textContent = CONFIG.textLines.scene1Text2;
                scene1Text.style.opacity = 1;
                setTimeout(() => switchScene(2), CONFIG.timings.scene1HugHold);
            }, CONFIG.timings.scene1GlobeMove);
        }, CONFIG.timings.scene1Text1Duration);
    }, CONFIG.timings.fadeDuration);

    // SCENE 2: Love Background
    const scene2Text = document.querySelector('#scene2 .text-overlay');
    setTimeout(() => {
        scene2Text.textContent = CONFIG.textLines.scene2Text1;
        scene2Text.style.opacity = 1;
        setTimeout(() => {
            scene2Text.style.opacity = 0;
            setTimeout(() => {
                scene2Text.textContent = CONFIG.textLines.scene2Text2;
                scene2Text.style.opacity = 1;
                setTimeout(() => {
                    scene2Text.style.opacity = 0;
                    switchScene(3);
                }, CONFIG.timings.scene2Text2Duration);
            }, CONFIG.timings.fadeDuration);
        }, CONFIG.timings.scene2Text1Duration);
    }, CONFIG.timings.fadeDuration);

    // SCENE 3: Question
    document.querySelectorAll('.yes-btn').forEach(btn => {
        addInteraction(btn, () => {
            launchConfetti(120, 3000);
            switchScene(4);
        });
    });

    // SCENE 4: Final Collage
    const collageGrid = document.querySelector('.collage-grid');
    CONFIG.collageImages.forEach((src, index) => {
        const item = document.createElement('div');
        item.className = 'collage-item';
        // Try to load image; if fails, show placeholder
        const img = new Image();
        img.src = src;
        img.onload = () => item.appendChild(img);
        img.onerror = () => {
            item.textContent = `Placeholder ${index + 1}`;
        };
        collageGrid.appendChild(item);
    });
});
