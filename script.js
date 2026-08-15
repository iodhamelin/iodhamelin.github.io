// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
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

// Setup Grid
const setupGrid = () => {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    let imagesHTML = '';
    
    // Shuffle images (images are numbered 2 to 18)
    const imageOrder = [];
    for(let i=2; i<=18; i++) imageOrder.push(i);
    imageOrder.sort(() => Math.random() - 0.5);

    imageOrder.forEach(num => {
        imagesHTML += `
            <div class="grid-wrapper" onclick="openLightbox('images/image_${num}.png')">
                <div class="grid-item">
                    <img src="images/image_${num}.png" alt="Artwork ${num}" loading="lazy">
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = imagesHTML;
};

setupGrid();

// Lightbox logic
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close-lightbox");

if (lightbox) {
    window.openLightbox = (src) => {
        lightbox.style.display = "block";
        lightboxImg.src = src;
    }

    closeBtn.onclick = () => {
        lightbox.style.display = "none";
    }

    lightbox.onclick = (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    }
}

// Art Deco / Hextech Canvas Background (Floating specs of magic)
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
    
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    
    for(let i = 0; i < particleCount; i++) {
        // Mixed colors: Hextech Cyan and Hextech Gold
        const isGold = Math.random() > 0.5;
        
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4 - 0.2, // Drift slightly upwards like magic dust
            alpha: Math.random() * 0.5,
            alphaChange: (Math.random() * 0.01) - 0.005,
            color: isGold ? '200, 155, 60' : '10, 200, 185' // Gold or Cyan
        });
    }
};

const animateCanvas = () => {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if(p.x < 0) p.x = width;
        if(p.x > width) p.x = 0;
        if(p.y < 0) p.y = height;
        if(p.y > height) p.y = 0;
        
        p.alpha += p.alphaChange;
        if(p.alpha <= 0.05 || p.alpha >= 0.6) {
            p.alphaChange = -p.alphaChange;
        }
        
        ctx.beginPath();
        // Give particles a diamond shape for Art Deco feel
        ctx.moveTo(p.x, p.y - p.radius);
        ctx.lineTo(p.x + p.radius, p.y);
        ctx.lineTo(p.x, p.y + p.radius);
        ctx.lineTo(p.x - p.radius, p.y);
        ctx.closePath();
        
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`; 
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${p.color}, ${p.alpha})`;
    });
    
    requestAnimationFrame(animateCanvas);
};

window.addEventListener('resize', initCanvas);
initCanvas();
animateCanvas();
