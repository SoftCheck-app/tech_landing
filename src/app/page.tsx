"use client";

import { useEffect } from 'react';
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import OurFlow from '@/components/OurFlow'
import Advantages from '@/components/Advantages'
import PlatformLook from '@/components/PlatformLook'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  // Iniciar en la parte superior cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden"
      >
        {/* Efecto de deslizamiento para la página principal */}
        <div className="absolute top-0 left-0 w-full pointer-events-none z-50">
          <motion.div 
            className="w-full h-screen bg-gradient-to-b from-primary-600 to-primary-800"
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          />
        </div>

        <Header />
        
        <main className="relative">
          <Hero />
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <OurFlow />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <PlatformLook />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Advantages />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
          <Pricing />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FAQ />
          </motion.div>
        </main>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  )
} 