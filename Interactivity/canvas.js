// To resize the canvas to full screen
let canvas = document.querySelector('canvas')
canvas.height = window.innerHeight
canvas.width = window.innerWidth

// To draw shapes
let c = canvas.getContext('2d')

// Create mouse object which gets the mouse's x coordinate and y coordinate
let mouse = {
    x: undefined,
    y: undefined
}

// whenever mouse position is changed, change the x and y
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x
    mouse.y = event.y
})

// when screen is resized, change the canvas size
// call init to create another set of circles and fill the canvas
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    init()
})

let maxRadius = 40
let colorArray = ['#88E0EF', '#161E54', '#FF5151', '#FF9B6A']

// create a class circle
class Circle {
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius; // to keep track of minimum radius not becoming negative
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)] // to get random array from our color array

        // create a circle
        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color
            c.fill()
        };
    }

    update() {
        // to get the bouncing effect
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // to add mouse interactivity
        // if circle is in less than 50 px near mouse coordinates
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            // increase the radius till radius < maxRadius
            if (this.radius < maxRadius)
                this.radius += 1
        } else if (this.radius > this.minRadius) { // else shrink the circle till we get minRadius 
            this.radius -= 1
        }
        this.draw();
    }
}

// create an empty array of circles
let circleArray = [];

// to create circles and pushing them in circle Array
function init() {
    circleArray = []
    let n = 1500; // number of circles created
    for (let i = 0; i < n; i++) {
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - (radius * 2)) + radius;
        let y = Math.random() * (innerHeight - (radius * 2)) + radius;
        let dx = (Math.random() - 0.5) * 5;
        let dy = (Math.random() - 0.5) * 5;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

// to get the animation, call animate inside requestAnimationFrame
// this will be an infinite function calling
// everytime update the positions to get circle moving effect
// this infinte loop will help in moving the circles over the canvas
function animate() {
    requestAnimationFrame(animate);
    // clear the canvas
    c.clearRect(0, 0, innerWidth, innerHeight);
    // circle.update()
    circleArray.forEach(element => {
        element.update()
    });
}

animate()
init()