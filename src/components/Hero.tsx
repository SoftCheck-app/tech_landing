"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useContactForm } from '@/contexts/ContactFormContext';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { openContactForm } = useContactForm();
  
  // Efecto para crear el fondo dinámico de partículas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Tamaño del canvas
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Clase para las partículas
    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 1;
      speedX: number = 0;
      speedY: number = 0;
      color: string = 'rgba(0, 150, 200, 0.2)';

      constructor() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1 + 0.5;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        this.color = `rgba(${Math.floor(Math.random() * 50) + 50}, ${Math.floor(Math.random() * 50) + 100}, ${Math.floor(Math.random() * 100) + 150}, ${Math.random() * 0.2 + 0.1})`;
      }

      update() {
        if (!canvas) return;
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Crear partículas
    const particlesArray: Particle[] = [];
    const particleCount = Math.min(40, window.innerWidth / 40);
    
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }

    // Conectar partículas de manera más sutil
    const connectParticles = () => {
      if (!canvas) return;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            if (!ctx) return;
            ctx.strokeStyle = `rgba(100, 150, 200, ${0.05 - distance/2000})`;
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animación
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
      requestAnimationFrame(animate);
    };

    animate();

    // Limpiar eventListeners
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      {/* Canvas de fondo para partículas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />
      
      {/* Cuadrícula más sutil */}
      <div className="absolute inset-0 z-0 tech-grid opacity-10"></div>
      
      {/* Degradado para añadir profundidad */}
      <div className="absolute inset-0 z-0 bg-gradient-radial from-transparent to-slate-100/50 dark:to-slate-900/70"></div>
      
      {/* Contenido principal */}
      <div className="container-section relative z-10 pt-20 w-full">
        <div className="flex justify-center items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-center w-full max-w-4xl mx-auto px-4"
          >
            {/* Badge */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800/50">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                NEW: Automated License Inventory
              </span>
            </motion.div>
            
            {/* Título con animaciones */}
            <div className="space-y-2 w-full">
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-none text-slate-900 dark:text-white w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="flex items-center justify-center gap-x-3 gap-y-1 w-full">
                  <motion.span 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-900 dark:text-white whitespace-nowrap"
                  >
                    Automate
                  </motion.span>
                  <motion.span 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="text-blue-600 dark:text-blue-400 whitespace-nowrap"
                  >
                    Software and License Inventory
                  </motion.span>
                </div>
              </motion.h1>
              <motion.p 
                className="max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-300 mt-6 mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Intelligent tool that automates software + license approval and inventory.
                <br />
                Reducing <span className="text-blue-600 dark:text-blue-400 font-medium">time, errors and costs</span>.
              </motion.p>
            </div>
            
            {/* CTA Buttons centrados */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  href="#platform" 
                  className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg inline-block"
                >
                  See our platform
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <button 
                  onClick={(e) => openContactForm()}
                  className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center group"
                >
                  REQUEST ACCESS
                  <svg 
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </button>
              </motion.div>
            </div>

            {/* Powered by section */}
            <div className="pt-12 opacity-70">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Powered by:</p>
              <div className="flex items-center justify-center gap-8">
                <div className="h-8 flex items-center">
                  <svg className="h-full w-auto text-slate-600 dark:text-slate-400" viewBox="0 0 272 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M115.75 46.75c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 33.98 81.24 24.57 93.5 24.57c12.26 0 22.25 9.41 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 38.77 80.99 46.75c0 7.98 5.79 13.44 12.51 13.44s12.51-5.46 12.51-13.44z" fill="currentColor"/>
                    <path d="M163.75 46.75c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.77 9.99-22.18 22.25-22.18s22.25 9.41 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.98 5.79 13.44 12.51 13.44s12.51-5.46 12.51-13.44z" fill="currentColor"/>
                    <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="currentColor"/>
                    <path d="M225 3v65h-9.5V3h9.5z" fill="currentColor"/>
                    <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="currentColor"/>
                    <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35 0 53.89 0 34.91 0 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="h-12 flex items-center">
                  <img 
                    src="https://images.squarespace-cdn.com/content/v1/62cd1f97bc798a438b38f99b/eba2516a-3355-43b2-bd76-0f0ca3686e6e/TETUAN+VALLEY_LOGO_darklandscape_transparentBG.png" 
                    alt="Tetuan Valley"
                    className="h-full w-auto object-contain brightness-0 opacity-60 dark:invert dark:opacity-40"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 