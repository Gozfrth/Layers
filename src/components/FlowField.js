import { useEffect, useRef, useState } from "react";


function FlowField() {
    const canvasRef = useRef();
    var debug = false;

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 1200;
        canvas.height = 600;

        var c = canvas.getContext('2d');

        console.log(c);
        c.fillStyle = 'white';
        c.strokeStyle = 'white';
        c.lineWidth = 1;
        var colors = [
            '#F49A5F',
            '#EE6C3C',
            '#A47F4C',
            '#6A5C3C',
            '#433F25',
        ]

        class Particle {
            constructor(effect) {
                this.effect = effect;
                this.x = Math.floor(Math.random() * this.effect.width);
                this.y = Math.floor(Math.random() * this.effect.height);
                this.speedX = 0;
                this.speedY = 0;
                this.speedModifier = Math.floor(Math.random() * 3 + 1);
                this.history = [{x: this.x, y: this.y}];
                this.maxLength = Math.floor(Math.random() * 200 + 10);
                this.angle = 0;
                this.timer = this.maxLength * 2;
                this.color = colors[Math.floor(Math.random() * 5)]
            }
            draw(context) {
                context.beginPath();
                context.moveTo(this.history[0].x, this.history[0].y)
                for (let i = 0; i < this.history.length; i++) {
                    context.lineTo(this.history[i].x, this.history[i].y);
                }
                context.strokeStyle = this.color
                context.stroke();
            }
            update() {
                this.timer--;
                if(this.timer >= 1) {
                    let x = Math.floor(this.x / this.effect.cellSize);
                    let y = Math.floor(this.y / this.effect.cellSize);
                    let index = y * this.effect.cols + x
                    this.angle = this.effect.flowField[index];
        
                    this.speedX = Math.cos(this.angle);
                    this.speedY = Math.sin(this.angle);
                    this.x += this.speedX * this.speedModifier;
                    this.y += this.speedY * this.speedModifier;
        
                    this.history.push({x: this.x, y: this.y})
                    if(this.history.length > this.maxLength) {
                        this.history.shift();
                    }
                }else if( this.history.length > 1){
                    this.history.shift();
                }else{
                    this.reset();
                }
            }
            reset() {
                this.x = Math.floor(Math.random() * this.effect.width);
                this.y = Math.floor(Math.random() * this.effect.height);
                this.history = [{x: this.x, y: this.y}]
                this.timer  = this.maxLength * 2
            }
        }
        
        //only one instance - main brain of the system
        class Effect {
            constructor(canvas) {
                this.canvas = canvas;
                this.height = this.canvas.height;
                this.width = this.canvas.width;
                this.particles = [];
                this.numberOfParticles = 100;
                this.cellSize = 5;
                this.rows = 0;
                this.cols = 0;
                this.flowField = [];
                this.curve = 10;
                this.zoom = 0.2;
                this.init();
        
            }
            init() {
                //flow field
                this.rows = Math.floor(this.height/ this.cellSize);
                this.cols = Math.floor(this.width/ this.cellSize);
                this.flowField = [];
        
                for (let y = 0; y < this.rows; y++) {
                    for (let x = 0; x < this.cols; x++) {
                        let angle = (Math.atan2(y* this.zoom, x* this.zoom) + Math.sin(x * this.zoom) * Math.cos(y * this.zoom)) * this.curve;
        /*                 let angle = Math.atan2(y * this.zoom, x * this.zoom) + Math.sin(Math.sqrt(x*x * this.zoom + y*y * this.zoom) * 0.1) * this.curve;
         *//*                 let angle = (Math.sin(x * this.zoom) * Math.tanh(y * this.zoom) + 1) * this.curve;
         */                this.flowField.push(angle);
                    }
                }
        
                //particles
                this.particles = []
                for (let i = 0; i < this.numberOfParticles; i++) {
                    this.particles.push(new Particle(this));
                }
            }
            drawGrid(context) {
                context.save();
                context.strokeStyle = 'rgb(0,255, 255)'
                context.lineWidth = 0.3
                for (let c = 0; c < this.cols; c++) {
                    context.beginPath();
                    context.moveTo(this.cellSize * c, 0);
                    context.lineTo(this.cellSize * c, this.height)
                    context.stroke()
                }
                for (let r = 0; r < this.rows; r++) {
                    context.beginPath()
                    context.moveTo(0, this.cellSize * r)
                    context.lineTo(this.width, this.cellSize * r)
                    context.stroke();
                }
                context.restore()
            }
            resize(width, height) {
                this.canvas.width = width;
                this.canvas.height = height;
                this.height = this.canvas.height;
                this.width = this.canvas.width;
                this.init()
            }
            render(context) {
                if(debug){
                    this.drawGrid(context)
                }
                this.particles.forEach(particle => {
                    particle.draw(context);
                    particle.update();
                })
            }
        }
        
        const effect = new Effect(canvas);
        
        function animate() {
            c.clearRect(0, 0, canvas.width, canvas.height)
            effect.render(c);
            requestAnimationFrame(animate);
            
        }
        animate();
    })
    
    return <canvas ref={canvasRef} className="bg-black mx-auto my-auto " style={{ borderRadius: '3rem' }} onClick={() => debug = !debug}></canvas>
}

export default FlowField