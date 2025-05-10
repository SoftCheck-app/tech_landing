"use client";

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface AdvantageProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const Advantage = ({ icon, title, description, index }: AdvantageProps) => {
  const advantageRef = useRef(null);
  const isInView = useInView(advantageRef, { once: true, amount: 0.5 });
  
  return (
    <motion.div
      ref={advantageRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative"
    >
      <div className="relative rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full">
        <div className="p-6 h-full flex flex-col">
          {/* Icono más limpio */}
          <div className="mb-5 flex items-center">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              {icon}
            </div>
          </div>
          
          {/* Título */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
            {title}
          </h3>
          
          {/* Separador simple */}
          <div className="w-12 h-1 bg-blue-500/70 rounded-full mb-3"></div>
          
          {/* Descripción */}
          <p className="text-slate-600 dark:text-slate-300 text-sm flex-grow">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Advantages = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const controls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  const advantages = [
    {
      icon: (
        <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Forget about tickets",
      description: "Our algorithms automate software requests, reducing response times from days to seconds.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "100% Customizable",
      description: "We adapt to your existing policies, ensuring a seamless integration into your organization.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Security driven",
      description: "We monitor all the software installed in the organization and we can detect any unauthorized software, outdated software and vulnerabilities.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Unified Management",
      description: "A single platform to manage all software requests, updates, and patches.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      title: "Total Integration",
      description: "Connect our tool with your existing systems like Intelligence Platforms and more.",
    },
    {
      icon: (
        <svg className="w-7 h-7 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Usage Control",
      description: "Monitor the usage of the software by the employees and the resources it consumes.",
    }
  ];

  return (
    <section id="advantages" ref={sectionRef} className="relative py-20 bg-slate-50 dark:bg-slate-900/50">
      {/* Background */}
      <div className="absolute inset-0 tech-grid opacity-5"></div>
      
      <div className="container-section relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="text-slate-800 dark:text-slate-200">WHY WE ARE</span> 
            <span className="text-blue-600 dark:text-blue-400 ml-2">BETTER?</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We combine the power of automation and security to save you time, increase the productivity of your employees and reduce the friction with them.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <Advantage
              key={index}
              icon={advantage.icon}
              title={advantage.title}
              description={advantage.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages; 