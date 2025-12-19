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
