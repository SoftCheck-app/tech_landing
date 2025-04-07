"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const links = [
    { label: "Home", href: "#" },
    { label: "Workflow", href: "#flow" },
    { label: "Advantages", href: "#advantages" },
    { label: "Platform", href: "#platform" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];
  
  const socialLinks = [
    { 
      label: "LinkedIn", 
      href: "https://linkedin.com/company/softcheck", 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
  ];

  return (
    <footer className="relative overflow-hidden pt-20 pb-10 bg-slate-950">
      {/* Decorative elements */}
      <div className="absolute inset-0 tech-grid opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
      
      {/* Scanning effect on side lines */}
      <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent opacity-70"></div>
      <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent opacity-70"></div>
      <motion.div 
        className="absolute left-0 top-0 h-full w-[1px] bg-cyan-400"
        animate={{ 
          top: ["-100%", "100%"],
          opacity: [0, 0.5, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 8, 
          ease: "linear" 
        }}
      />
      <motion.div 
        className="absolute right-0 top-0 h-full w-[1px] bg-cyan-400"
        animate={{ 
          top: ["100%", "-100%"],
          opacity: [0, 0.5, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 8, 
          ease: "linear" 
        }}
      />

      <div className="container-section relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          {/* Logo and description column */}
          <div className="md:col-span-4">
            <div className="flex items-center mb-6">
              <motion.div 
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.2 }}
                className="relative w-[22px] h-[28px] mr-2"
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
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Transform your software and license management process with our automated solution.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-10 h-10 rounded-full glass-card border border-gray-800/50 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">{social.label}</span>
                  {social.icon}
                  {/* Glow ring on hover */}
                  <span className="absolute inset-0 rounded-full border border-cyan-500/0 hover:border-cyan-500/50 transition-colors duration-300"></span>
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick links */}
          <div className="md:col-span-2">
            <h3 className="tech-text text-gray-200 mb-4 text-base font-medium">LINKS</h3>
            <ul className="space-y-3">
              {links.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-cyan-400 transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact information */}
          <div className="md:col-span-3">
            <h3 className="tech-text text-gray-200 mb-4 text-base font-medium">CONTACT</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:info@softcheck.io" 
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 text-gray-500 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hello@softcheck.app
                </a>
              </li>
              <li>
                <a 
                  href="https://goo.gl/maps/1234" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 text-gray-500 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Madrid, Spain
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Separator line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-6"></div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm tech-text mb-4 md:mb-0">
            &copy; {currentYear} SoftCheck. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-cyan-400 transition-colors text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 