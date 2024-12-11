import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const AnimatedBackground = () => {
  // Create motion values for mouse tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Create transform functions for background movement
  const backgroundX = useTransform(x, [-100, 100], ["-10%", "10%"]);
  const backgroundY = useTransform(y, [-100, 100], ["-10%", "10%"]);

  // Particle system references
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  // Mouse move handler
  const handleMouseMove = (event) => {
    x.set(event.clientX - window.innerWidth / 2);
    y.set(event.clientY - window.innerHeight / 2);
  };

  // Particle class for dynamic background effects
  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.reset();
    }

    reset() {
      this.x = Math.random() * this.canvas.width;
      this.y = Math.random() * this.canvas.height;
      this.radius = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.color = `rgba(${Math.random() * 100 + 100}, ${
        Math.random() * 100 + 100
      }, ${Math.random() * 255}, ${Math.random() * 0.5})`;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around screen
      if (this.x < 0) this.x = this.canvas.width;
      if (this.x > this.canvas.width) this.x = 0;
      if (this.y < 0) this.y = this.canvas.height;
      if (this.y > this.canvas.height) this.y = 0;
    }

    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }
  }

  // Initialize and animate particles
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Resize canvas to full window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    const particleCount = 300;
    particlesRef.current = Array.from(
      { length: particleCount },
      () => new Particle(canvas)
    );

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Gradient Background Layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
          backgroundSize: "400% 400%",
          transform: "translate3d(0,0,0)",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Particle Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Overlay Layers */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 mix-blend-overlay"
        style={{
          x: backgroundX,
          y: backgroundY,
        }}
      />
      <div className="absolute inset-0 bg-noise opacity-10" />
    </div>
  );
};

export default AnimatedBackground;
