// Global variables
let circles = []; // Array to store moving circles
let bgColors = ['#FF5733', '#33FF57', '#3357FF', '#FFD700', '#8A2BE2']; // Background colors
let bgColorIndex = 0;
let particles = []; // Extra animation for visual interest

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(bgColors[bgColorIndex]);
}

function draw() {
    background(bgColors[bgColorIndex]); // Refresh background

    // Display and manage circles
    for (let i = circles.length - 1; i >= 0; i--) {
        circles[i].move();
        circles[i].display();
        circles[i].age();
        if (circles[i].isGone()) {
            circles.splice(i, 1); // Remove circles that faded out
        }
    }

    // Display and remove old particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        if (particles[i].isDone()) {
            particles.splice(i, 1);
        }
    }
}

// Change background color with arrow keys
function keyPressed() {
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
        bgColorIndex = (bgColorIndex + 1) % bgColors.length;
    }
}

// Create circles on mouse press
function mousePressed() {
    let newCircle = new MovingCircle(mouseX, mouseY);
    circles.push(newCircle);

    // Spawn particle burst for added effect
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(mouseX, mouseY));
    }
}



// MovingCircle class
class MovingCircle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(20, 50);
        this.speedX = random(-2, 2);
        this.speedY = random(-2, 2);
        this.lifespan = 255; // Circle fades over time
        this.color = color(random(255), random(255), random(255)); // Randomized colors
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    display() {
        noStroke();
        fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
        ellipse(this.x, this.y, this.size);

        // Hover effect: Increase size slightly
        if (dist(mouseX, mouseY, this.x, this.y) < this.size / 2) {
            this.size += 0.3;
        }
    }

    age() {
        this.lifespan -= 2;
    }

    isGone() {
        return this.lifespan <= 0;
    }
}

// Particle class for burst animation
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velX = random(-2, 2);
        this.velY = random(-2, 2);
        this.alpha = 255;
    }

    update() {
        this.x += this.velX;
        this.y += this.velY;
        this.alpha -= 5;
    }

    show() {
        noStroke();
        fill(255, this.alpha);
        ellipse(this.x, this.y, 5);
    }

    isDone() {
        return this.alpha <= 0;
    }
}
