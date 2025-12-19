'use strict';
if (gameOver) resetGame();
}
});


// =====================
// Collision
// =====================
function isColliding(a, b) {
return (
a.x < b.x + b.w &&
a.x + a.w > b.x &&
a.y < b.y + b.h &&
a.y + a.h > b.y
);
}


// =====================
// Reset
// =====================
function resetGame() {
obstacles.length = 0;
score = 0;
speed = 6;
gameOver = false;
}


// =====================
// Main Loop
// =====================
let frame = 0;


function loop() {
ctx.clearRect(0, 0, canvas.width, canvas.height);


if (!gameOver) {
frame++;
score++;


if (frame % 90 === 0) spawnObstacle();
if (frame % 600 === 0) speed++;


player.update();


obstacles.forEach(o => o.x -= speed);


for (let o of obstacles) {
if (isColliding(player, o)) {
gameOver = true;
highScore = Math.max(highScore, score);
localStorage.setItem('highScore', highScore);
}
}
}


// Draw ground
ctx.fillStyle = '#555';
ctx.fillRect(0, GROUND_Y + 40, canvas.width, 4);


player.draw();


// Draw obstacles
ctx.fillStyle = '#f00';
obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.w, o.h));


// UI
ctx.fillStyle = '#fff';
ctx.fillText(`Score: ${score}`, 10, 20);
ctx.fillText(`High: ${highScore}`, 10, 40);


if (gameOver) {
ctx.fillText('GAME OVER - Press Space', 300, 150);
}


requestAnimationFrame(loop);
}
const backgroundLayers = [
{ x: 0, speed: 1, color: '#1a1a1a' },
{ x: 0, speed: 2, color: '#222' }
];


function drawBackground() {
backgroundLayers.forEach(layer => {
layer.x -= layer.speed;
if (layer.x <= -canvas.width) layer.x = 0;


ctx.fillStyle = layer.color;
ctx.fillRect(layer.x, 0, canvas.width, canvas.height);
ctx.fillRect(layer.x + canvas.width, 0, canvas.width, canvas.height);
});
}


loop();
let shieldActive = false;
let shieldTimer = 0;
const powerUps = [];


function spawnPowerUp() {
powerUps.push({ x: canvas.width, y: GROUND_Y - 20, w: 20, h: 20 });
}
if (frame % 800 === 0) spawnPowerUp();
powerUps.forEach((p, i) => {
  p.x -= speed;
  if (isColliding(player, p)) {
    shieldActive = true;
    shieldTimer = 300;
    powerUps.splice(i, 1);
  }
});
if (shieldActive) {
shieldTimer--;
if (shieldTimer <= 0) shieldActive = false;
}
if (isColliding(player, o) && !shieldActive) {
gameOver = true;
}
if (shieldActive) {
ctx.strokeStyle = '#0ff';
ctx.strokeRect(player.x - 5, player.y - 5, player.w + 10, player.h + 10);
}
let jumpCount = 0;


// modify jump logic
if (e.code === 'Space') {
if (jumpCount < 2 && !gameOver) {
player.vy = JUMP_FORCE;
jumpCount++;
}
}


// reset on ground
if (player.y >= GROUND_Y) {
jumpCount = 0;
}
<audio id="jumpSound" src="jump.wav"></audio>
<audio id="hitSound" src="hit.wav"></audio>

const jumpSound = document.getElementById('jumpSound');
const hitSound = document.getElementById('hitSound');

jumpSound.currentTime = 0;
jumpSound.play();
canvas.addEventListener('touchstart', () => {
if (!gameOver) {
player.vy = JUMP_FORCE;
} else {
resetGame();
}
});
const enemy = {
x: 300,
y: GROUND_Y,
w: 30,
h: 40,
vy: 0,


update() {
if (Math.random() < 0.02) this.vy = JUMP_FORCE;
this.vy += GRAVITY;
this.y += this.vy;
if (this.y >= GROUND_Y) this.y = GROUND_Y;
},


draw() {
ctx.fillStyle = '#ff0';
ctx.fillRect(this.x, this.y, this.w, this.h);
}
};
