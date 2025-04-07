"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactForm } from '@/contexts/ContactFormContext';
import Image from 'next/image';

const LogoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="22" height="22" rx="4" fill="#1A1B26"/>
    <rect x="4" y="4" width="14" height="14" rx="1" fill="#3B82F6"/>
  </svg>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openContactForm } = useContactForm();

  // Detect scroll to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#flow', label: 'WORKFLOW' },
    { href: '#platform', label: 'PLATFORM' },
    { href: '#advantages', label: 'ADVANTAGES' },
    { href: '#pricing', label: 'PRICING' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'py-1.5 bg-white/60 dark:bg-slate-900/60 shadow-sm backdrop-blur-md' : 'py-2.5 bg-transparent'
    }`}>
      {/* Scanning line in header */}
      {isScrolled && <div className="scanning-line"></div>}
      
      <div className="container-section">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <motion.div 
              className="flex items-center gap-2.5" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.2 }}
                className="relative w-[22px] h-[28px]"
              >
                <Image 
                  src="/images/logo_notext.png"
                  alt="SoftCheck Logo"
                  width={28}
                  height={28}
                  className="rounded-md"
                />
              </motion.div>
              <span className="text-[18px] font-medium text-[#e4e6eb]">
                Soft<span className="text-[#3b82f6]">Check</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {links.map((link, index) => (
              <Link 
                key={index} 
                href={link.href}
                className="relative overflow-hidden group"
              >
                <motion.div
                  className="px-4 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {link.label}
                  
                  {/* Animated underline */}
                  <motion.div 
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 dark:bg-blue-400"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <button
            onClick={(e) => openContactForm()}
            className="hidden md:inline-flex items-center px-5 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
          >
            <span>GET STARTED</span>
            <svg
              className="w-4 h-4 ml-2" 
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="flex items-center p-1.5 text-slate-700 dark:text-slate-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="relative w-6 h-5">
                <motion.span
                  className="absolute h-0.5 w-6 bg-slate-700 dark:bg-slate-300 transform transition-all duration-300 rounded-full"
                  animate={{
                    top: isMobileMenuOpen ? '10px' : '0px',
                    rotateZ: isMobileMenuOpen ? '45deg' : '0deg',
                  }}
                />
                <motion.span
                  className="absolute h-0.5 w-6 bg-slate-700 dark:bg-slate-300 transform transition-all duration-300 rounded-full top-2"
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    width: isMobileMenuOpen ? 0 : '100%',
                  }}
                />
                <motion.span
                  className="absolute h-0.5 w-6 bg-slate-700 dark:bg-slate-300 transform transition-all duration-300 rounded-full top-4"
                  animate={{
                    top: isMobileMenuOpen ? '10px' : '16px',
                    rotateZ: isMobileMenuOpen ? '-45deg' : '0deg',
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 shadow-md"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container px-4 py-3 space-y-2">
              {links.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="block py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                  <div className="h-px bg-slate-200 dark:bg-slate-700 mt-1.5"></div>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (links.length + 1) * 0.1 }}
              >
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openContactForm();
                  }}
                  className="block w-full mt-3 text-center py-1.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
                >
                  GET STARTED NOW
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 