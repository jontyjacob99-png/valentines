// CONFIG: Edit these at the top for easy customization
const CONFIG = {
    timings: {
        scene1Text1Duration: 3000,  // ms: First text display in Scene 1
        scene1GlobeMove: 2800,     // ms: Globes moving closer
        scene1HugHold: 8000,       // ms: Total hug scene hold from hug start
        scene2Text1Duration: 2500, // ms: First text in Scene 2
        scene2Text2Duration: 1500, // ms: Second text in Scene 2
        fadeDuration: 600,         // ms: Fade transitions (reduce to 300 for faster)
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

// Utility: Add event listener for pointerdown and click (with immediate response)
function addInteraction(element, callback) {
    const handler = (e) => {
        e.preventDefault();  // Prevent default to make it snappier
        callback();
    };
    element.addEventListener('pointerdown', handler);
    element.addEventListener('click', handler);
}

// Scene transitions
function switchScene(toScene) {
    console.log(`Switching from Scene ${currentScene} to Scene ${toScene}`);  // Debug log
    scenes[currentScene].classList.add('fade-out');
    setTimeout(() => {
        scenes[currentScene].classList.remove('active', 'fade-out');
        currentScene = toScene;
        scenes[currentScene].classList.add('active');
        // Trigger scene-specific logic
        if (sceneHandlers[toScene]) {
            sceneHandlers[toScene]();
        }
    }, CONFIG.timings.fadeDuration);
}

// Confetti function (no external libs)
function launchConfetti(numPieces, duration) {
    console.log('Launching confetti');  // Debug log
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

// Scene handlers: Define logic for each scene
const sceneHandlers = {
    1: () => {  // SCENE 1: Long Distance
        console.log('Scene 1 activated: Starting animations');  // Debug log
        const scene1Text = document.querySelector('#scene1 .text-overlay');
        const indiaGlobe = document.querySelector('.globe.india');
        const usaGlobe = document.querySelector('.globe.usa');
        const herChar = document.querySelector('.char-sprite.her');
        const meChar = document.querySelector('.char-sprite.me');
        const heart = document.querySelector('.heart');

        // First text
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
    },
    2: () => {  // SCENE 2: Love Background
        console.log('Scene 2 activated: Starting text sequence');  // Debug log
        const scene2Text = document.querySelector('#scene2 .text-overlay');
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
    },
    3: () => {  // SCENE 3: Question (buttons already set up globally)
        console.log('Scene 3 activated: Waiting for YES click');  // Debug log
    },
    4: () => {  // SCENE 4: Final Collage
        console.log('Scene 4 activated: Loading collage');  // Debug log
        const collageGrid = document.querySelector('.collage-grid');
        CONFIG.collageImages.forEach((src, index) => {
            const item = document.createElement('div');
            item.className = 'collage-item';
            const img = new Image();
            img.src = src;
            img.onload = () => item.appendChild(img);
            img.onerror = () => {
                item.textContent = `Placeholder ${index + 1}`;
            };
            collageGrid.appendChild(item);
        });
    },
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded, initializing...');  // Debug log
    // SCENE 0: Start button
    addInteraction(document.querySelector('.start-button'), () => {
        console.log('Start button clicked');  // Debug log
        switchScene(1);
    });

    // SCENE 3: YES buttons (set up globally since they're always there)
    document.querySelectorAll('.yes-btn').forEach(btn => {
        addInteraction(btn, () => {
            console.log('YES button clicked');  // Debug log
            launchConfetti(120, 3000);
            switchScene(4);
        });
    });

    // Start with Scene 0 active
    scenes[0].classList.add('active');
});
