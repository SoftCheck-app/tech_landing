"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { useContactForm } from '@/contexts/ContactFormContext';

const Partners: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const controls = useAnimation();
  const { openContactForm } = useContactForm();
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);
  
  const partners = [
    { name: 'Microsoft', logo: '/logos/microsoft.svg', width: 150, height: 45 },
    { name: 'SAP', logo: '/logos/sap.svg', width: 100, height: 45 },
    { name: 'Oracle', logo: '/logos/oracle.svg', width: 150, height: 45 },
    { name: 'Adobe', logo: '/logos/adobe.svg', width: 120, height: 45 },
    { name: 'Salesforce', logo: '/logos/salesforce.svg', width: 150, height: 45 },
    { name: 'Cisco', logo: '/logos/cisco.svg', width: 120, height: 45 },
    { name: 'IBM', logo: '/logos/ibm.svg', width: 100, height: 45 },
    { name: 'Atlassian', logo: '/logos/atlassian.svg', width: 150, height: 45 },
  ];
  
  const trustedBy = [
    { name: 'Banco Santander', logo: '/logos/santander.svg' },
    { name: 'BBVA', logo: '/logos/bbva.svg' },
    { name: 'Telefonica', logo: '/logos/telefonica.svg' },
    { name: 'Iberdrola', logo: '/logos/iberdrola.svg' },
    { name: 'Mapfre', logo: '/logos/mapfre.svg' },
  ];
  
  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container-section">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-slate-800 dark:text-slate-200">STRATEGIC</span> 
              <span className="text-blue-600 dark:text-blue-400 ml-2">PARTNERS</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We work with leading software providers to offer integrated and efficient management
            </p>
          </div>
          
          <div className="mb-16">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-8 text-center">
              Software Provider Integrations
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative h-16 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg px-6 py-4 border border-slate-200 dark:border-slate-700"
                  style={{ width: partner.width + 48 }}
                >
                  <div className="opacity-70 hover:opacity-100 transition-opacity w-full h-full flex items-center justify-center">
                    {/* Nota: En un proyecto real estas imágenes deberían estar disponibles */}
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-slate-700 dark:text-slate-300 font-medium">{partner.name}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-8 text-center">
              Companies that Trust Us
            </h3>
            
            <div className="flex flex-wrap items-center justify-center gap-8">
              {trustedBy.map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="relative h-16 bg-slate-50 dark:bg-slate-800 rounded-lg px-6 py-4 border border-slate-200 dark:border-slate-700 w-40"
                >
                  <div className="opacity-70 hover:opacity-100 transition-opacity w-full h-full flex items-center justify-center">
                    {/* Nota: En un proyecto real estas imágenes deberían estar disponibles */}
                    <p className="text-slate-700 dark:text-slate-300 font-medium text-sm">{company.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <button 
              onClick={(e) => openContactForm()}
              className="inline-flex items-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              REQUEST SUCCESS CASE
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners; 