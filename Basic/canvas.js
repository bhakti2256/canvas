// To resize the canvas to full screen
let canvas = document.querySelector('canvas')
canvas.height = window.innerHeight
canvas.width = window.innerWidth

// To draw shapes
let c = canvas.getContext('2d')

// c.fillRect(x, y, width, height)
// To change color 
c.fillStyle = 'darkblue';
for (let i = 0; i < canvas.width; i = i + 20) {
    c.fillRect(i, 0, 10, 10);
    c.fillRect(i+10, 10, 10, 10);
    c.fillRect(i, 20, 10, 10);
}

// Line
c.beginPath();
// c.moveTo(x, y) Starting points
c.moveTo(100, 300);
c.lineTo(150, 180);
c.lineTo(200, 300);
c.lineTo(100, 210);
c.lineTo(200, 210);
c.lineTo(100, 300);
// To change color of the line
c.strokeStyle = 'red';
c.stroke(); // To show the line

// Arc or circle

c.strokeStyle = 'black';

for (let i = 0; i < canvas.width; i = i + 60) {
    c.beginPath();
    c.arc(i + 30, 80, 30, 0, Math.PI * 2, false);
    c.stroke()
}

let x = 200;
let y = 200;
let dx = 5;
let dy = 5;
let radius = 30;
function animate() {
    requestAnimationFrame(animate);
    // clear the canvas
    c.clearRect(0, 0, innerWidth, innerHeight);

    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, false);
    c.strokeStyle = 'purple';
    c.stroke();
    if(x + radius > innerWidth || x - radius < 0) {
        dx = -dx;
    }
    if(y + radius > innerHeight || y - radius < 0) {
        dy = -dy;
    }
    x = x + dx;
    y = y + dy;
}

animate()