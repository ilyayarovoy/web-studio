interface RendererOptions {
  canvas: HTMLCanvasElement;
}

interface Renderer {
  ready: Promise<void>;
  dispose: () => void;
}

export function createRenderer({ canvas }: RendererOptions): Renderer {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get 2D context");
  }

  let animationId: number | null = null;
  let particles: Particle[] = [];
  let mouseX = 0;
  let mouseY = 0;
  let centerX = 0;
  let centerY = 0;

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    centerX = rect.width / 2;
    centerY = rect.height / 2;
  }

  function createParticles() {
    particles = [];
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 300 + 100;

      particles.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }
  }

  function updateParticles() {
    const blackHoleX = mouseX || centerX;
    const blackHoleY = mouseY || centerY;
    const blackHoleRadius = 80;
    const gravityStrength = 0.3;

    particles.forEach((particle) => {
      const dx = blackHoleX - particle.x;
      const dy = blackHoleY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < blackHoleRadius) {
        particle.opacity -= 0.02;
        if (particle.opacity <= 0) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * 300 + 200;
          particle.x = centerX + Math.cos(angle) * dist;
          particle.y = centerY + Math.sin(angle) * dist;
          particle.opacity = Math.random() * 0.5 + 0.3;
        }
      } else {
        particle.opacity = Math.min(particle.opacity + 0.01, 0.8);
      }

      const force = (gravityStrength * 100) / (distance * distance);
      const angle = Math.atan2(dy, dx);

      particle.vx += Math.cos(angle) * force;
      particle.vy += Math.sin(angle) * force;

      particle.vx *= 0.99;
      particle.vy *= 0.99;

      particle.x += particle.vx;
      particle.y += particle.vy;
    });
  }

  function drawParticles() {
    particles.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(161, 255, 98, ${particle.opacity})`;
      ctx.fill();
    });
  }

  function drawBlackHole() {
    const blackHoleX = mouseX || centerX;
    const blackHoleY = mouseY || centerY;

    const gradient = ctx.createRadialGradient(
      blackHoleX,
      blackHoleY,
      0,
      blackHoleX,
      blackHoleY,
      80
    );
    gradient.addColorStop(0, "rgba(21, 19, 19, 1)");
    gradient.addColorStop(0.5, "rgba(104, 64, 255, 0.3)");
    gradient.addColorStop(1, "rgba(161, 255, 98, 0)");

    ctx.beginPath();
    ctx.arc(blackHoleX, blackHoleY, 80, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  function render() {
    ctx.fillStyle = "#151313";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    updateParticles();
    drawBlackHole();
    drawParticles();

    animationId = requestAnimationFrame(render);
  }

  function handleMouseMove(e: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }

  function handleTouchMove(e: TouchEvent) {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.touches[0].clientX - rect.left;
      mouseY = e.touches[0].clientY - rect.top;
    }
  }

  resize();
  createParticles();

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("touchmove", handleTouchMove);

  const ready = Promise.resolve();
  render();

  return {
    ready,
    dispose: () => {
      if (animationId !== null) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
    },
  };
}
