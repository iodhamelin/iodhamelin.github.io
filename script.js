// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Unobserve after showing to keep the animation only once
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden').forEach((el) => {
    observer.observe(el);
});

// Nav scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Setup Gallery Track
const setupGallery = () => {
    const track = document.querySelector('.gallery-track');
    if (!track) return;

    // Use available images dynamically
    const numImages = 17; // We have 17 images based on renaming
    let imagesHTML = '';
    
    // We mix them up a bit to make it look nicer
    const imageOrder = [];
    for(let i=1; i<=numImages; i++) imageOrder.push(i);
    // Simple shuffle
    imageOrder.sort(() => Math.random() - 0.5);

    imageOrder.forEach(num => {
        imagesHTML += `
            <div class="gallery-item">
                <img src="images/image_${num}.png" alt="Artwork ${num}" loading="lazy">
            </div>
        `;
    });
    
    // Duplicate for infinite scroll
    track.innerHTML = imagesHTML + imagesHTML;
};

setupGallery();

// Starry Canvas Background
const canvasContainer = document.getElementById('canvas-container');
const canvas = document.createElement('canvas');
canvasContainer.appendChild(canvas);
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

const initCanvas = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    
    // Create particles
    const particleCount = window.innerWidth < 768 ? 50 : 120;
    
    for(let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            alpha: Math.random(),
            alphaChange: (Math.random() * 0.02) - 0.01
        });
    }
};

const animateCanvas = () => {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around edges
        if(p.x < 0) p.x = width;
        if(p.x > width) p.x = 0;
        if(p.y < 0) p.y = height;
        if(p.y > height) p.y = 0;
        
        // Twinkle effect
        p.alpha += p.alphaChange;
        if(p.alpha <= 0.1 || p.alpha >= 0.8) {
            p.alphaChange = -p.alphaChange;
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // Deep purple / accent color glow
        ctx.fillStyle = `rgba(162, 115, 255, ${p.alpha})`; 
        ctx.fill();
    });
    
    requestAnimationFrame(animateCanvas);
};

window.addEventListener('resize', () => {
    initCanvas();
});

initCanvas();
animateCanvas();
