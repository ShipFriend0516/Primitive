import React, { useEffect, useRef } from 'react';

const Fireworks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 3 + 2;
        this.vx = Math.cos(angle) * velocity * 1.25;
        this.vy = Math.sin(angle) * velocity * 1.25;
        this.alpha = 1;
        this.color = color;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05;
        this.alpha -= 0.01;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let particles: Particle[] = [];

    const createFirework = (x: number, y: number) => {
      const colors = ['#ff0000', '#ffd700', '#00ff00', '#00ffff', '#ff00ff'];
      for (let i = 0; i < 70; i++) {
        particles.push(
          new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]),
        );
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.03) {
        createFirework(Math.random() * canvas.width, canvas.height * 0.8);
      }

      particles = particles.filter((particle) => particle.alpha > 0);
      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='fixed inset-0 pointer-events-none z-[-1]'
    />
  );
};

export default Fireworks;
