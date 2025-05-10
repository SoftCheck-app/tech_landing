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
                LIMITED EARLY ACCESS
                <br />
                <span className="text-xs text-slate-600 dark:text-slate-400">Book it now and get it discounted.</span>
              </span>
            </motion.div>
            
            {/* Título con animaciones */}
            <div className="space-y-2 w-full">
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-6xl font-bold leading-none text-slate-900 dark:text-white w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="flex items-center justify-center gap-x-3 gap-y-1 w-full">
                  <motion.span 
                    className="text-slate-900 dark:text-white whitespace-nowrap"
                  >
                    Automate
                  </motion.span>
                  <motion.span 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="text-blue-600 dark:text-blue-400 whitespace-nowrap"
                  >
                    Software Asset Management
                  </motion.span>
                </div>
              </motion.h1>
              <motion.p 
                className="max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-300 mt-6 mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                IA tool that automates software approval and management
                <br />
                Reducing <span className="text-blue-600 dark:text-blue-400 font-medium">time, errors and costs.</span>
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

            {/* Trusted by section */}
            <div className="pt-12">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Trusted by:</p>
              <div className="flex items-center justify-center gap-12">
                <div className="h-20 flex items-center">
                  <img 
                    src="/images/google_for_startups.png"
                    alt="Google for Startups"
                    className="h-full w-auto object-contain filter grayscale"
                  />
                </div>
                <div className="h-20 flex items-center">
                  <img 
                    src="/images/tetuan_valley.png" 
                    alt="Tetuan Valley"
                    className="h-full w-auto object-contain filter grayscale"
                  />
                </div>
                <div className="h-16 flex items-center">
                  <img 
                    src="/images/incibe.png" 
                    alt="Incibe"
                    className="h-full w-auto object-contain filter grayscale"
                  />
                </div>
                <div className="h-14 flex items-center">
                  <img 
                    src="/images/scrm_logo.png" 
                    alt="SCRM_LIDL"
                    className="h-full w-auto object-contain filter grayscale"
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