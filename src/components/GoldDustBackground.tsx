import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  fadeSpeed: number;
  color: string;
}

export const GoldDustBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(212, 175, 55, ',    // Imperial Gold
      'rgba(179, 139, 89, ',    // Polished Bronze
      'rgba(235, 215, 160, ',   // Pale Champagne
      'rgba(245, 230, 185, '    // Gold Shimmer
    ];

    // Particle pool - lightweight for mobile battery and smooth 60fps
    const particleCount = window.innerWidth < 768 ? 28 : 55;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.8,
        speedY: Math.random() * 0.4 + 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.7 + 0.2,
        fadeSpeed: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Touch / Click interactive star burst on mobile & desktop
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      for (let i = 0; i < 6; i++) {
        particles.push({
          x: clientX + (Math.random() - 0.5) * 20,
          y: clientY + (Math.random() - 0.5) * 20,
          size: Math.random() * 2.5 + 1.2,
          speedY: (Math.random() - 0.5) * 1.5,
          speedX: (Math.random() - 0.5) * 1.5,
          opacity: 0.9,
          fadeSpeed: -0.02,
          color: 'rgba(255, 223, 128, '
        });
      }
      if (particles.length > 80) {
        particles.splice(0, particles.length - 80);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += p.fadeSpeed;

        if (p.opacity > 0.85 || p.opacity < 0.15) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Wrap around screen boundaries
        if (p.y > height) {
          p.y = -5;
          p.x = Math.random() * width;
        } else if (p.y < -5) {
          p.y = height;
        }

        if (p.x > width) p.x = 0;
        else if (p.x < 0) p.x = width;

        // Draw luminous soft particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, p.opacity)})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-75"
      aria-hidden="true"
    />
  );
};

