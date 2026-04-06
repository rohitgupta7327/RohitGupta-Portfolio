import { useEffect, useRef } from "react";

const ParticalsBackground = () => {
  const canvasRef = useRef(null); // to access the canvas element
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");                  // to draw on the canvas
    let particles = []; // to store the particles
    const particleCount = 50;
    const colors = ["rgba(255,255,255,0.7)"];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width; // random position
        this.y = Math.random() * canvas.height; // random position
        this.radius = Math.random() * 2 + 1; // limit the size of particles
        this.colors = colors[Math.floor(Math.random() * colors.length)]; // random color from the array
        this.speedX = (Math.random() - 0.5) * 0.5; // random horizontal speed
        this.speedY = (Math.random() - 0.5) * 0.5; // random vertical speed
      }

      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.colors;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.colors;
        ctx.fill();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width; // if the particle goes off the left edge, wrap it to the right edge
        if (this.x > canvas.width) this.x = 0; // if the particle goes off the right edge, wrap it to the left edge
        if (this.y < 0) this.y = canvas.height; // if the particle goes off the top edge, wrap it to the bottom edge
        if (this.y > canvas.height) this.y = 0; // if the particle goes off the bottom edge, wrap it to the top edge

        this.draw();
      }
    }

    function createParticles() {
      // to create the particles and store them in the array
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    function handleresize() {
      // to handle the window resize event and adjust the canvas size for particle accordingly
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    }
    handleresize();

    window.addEventListener("resize", handleresize); // to listen for the window resize event and call the handleresize function
    let animationId;
    function animate() {
      // to animate the particles by updating their position and redrawing them on the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => particle.update());
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleresize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    ></canvas>
  );
};

export default ParticalsBackground;
