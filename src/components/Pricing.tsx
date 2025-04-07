"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useContactForm } from '@/contexts/ContactFormContext';

type PlanFeature = {
  title: string;
  included: boolean;
};

type PricingPlan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  delay: number;
  badge?: string;
  starting?: boolean;
};

const PricingCard = ({ 
  name, 
  price, 
  period,
  description, 
  features, 
  popular = false,
  delay,
  badge,
  starting = false
}: PricingPlan) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true });
  const { openContactForm } = useContactForm();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay * 0.2 }}
      className="relative"
    >
      {/* Efecto sutil para la tarjeta popular */}
      {popular && (
        <div className="absolute -inset-px bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl opacity-10"></div>
      )}
      
      <div className={`relative h-full rounded-xl overflow-hidden transition-all duration-300 bg-white dark:bg-slate-800 border ${popular ? 'border-blue-300 dark:border-blue-600/50 shadow-lg' : 'border-slate-200 dark:border-slate-700 shadow-sm'} w-[400px]`}>
        {/* Badge */}
        {badge && (
          <div className="absolute top-3 right-3">
            <div className="bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded text-[10px] font-medium text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50">
              {badge}
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="p-6 md:p-8 pt-10">
          {/* Plan name */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white whitespace-pre-line">
              {name}
            </h3>
            <div className="w-12 h-1 bg-blue-500 rounded-full mt-2"></div>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            <div className="flex flex-col">
              <div className="flex items-baseline">
                <span className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {price}
                </span>
              </div>
              {(starting || period) && (
                <div className="mt-1 flex flex-col">
                  {starting && (
                    <span className="text-slate-500 dark:text-slate-400 text-sm">*starting from</span>
                  )}
                  {period && (
                    <span className="text-slate-500 dark:text-slate-400 text-sm">/{period}</span>
                  )}
                </div>
              )}
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">{description}</p>
          </div>
          
          {/* Features */}
          <ul className="space-y-3 mb-8 flex flex-col flex-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                {feature.included ? (
                  <div className="flex-shrink-0 h-5 w-5 text-green-500 dark:text-green-400 mr-2">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="flex-shrink-0 h-5 w-5 text-slate-400 dark:text-slate-600 mr-2">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )}
                <span className={feature.included ? 'text-slate-700 dark:text-slate-300 text-sm' : 'text-slate-500 dark:text-slate-500 text-sm'}>
                  {feature.title}
                </span>
              </li>
            ))}
          </ul>
          
          {/* Button */}

          <button 
            onClick={() => openContactForm(name)}
            className={`w-full block text-center py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
              popular 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {popular ? 'START NOW' : 'SELECT PLAN'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Pricing = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const controls = useAnimation();
  const { openContactForm } = useContactForm();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const plans: PricingPlan[] = [

    {
      name: 'Software Inventory',
      price: '1,50€',
      period: 'month per employee',
      description: '',
      badge: '',
      starting: true,
      features: [
        { title: 'Unlimited employees', included: true },
        { title: 'Automated software approval', included: true },
        { title: 'Automated software inventory', included: true },
        { title: 'Priority 24/7 support', included: true },
        { title: 'Custom dashboard', included: true },
        { title: 'Custom approval policies', included: true },
      ],
      delay: 2,
    },
    {
      name: 'Software + License\nInventory',
      price: 'Contact Us',
      period: '',
      description: '',
      badge: 'Recommended',
      starting: false,
      features: [
        { title: 'Unlimited employees', included: true },
        { title: 'Automated software approval', included: true },
        { title: 'Automated software inventory', included: true },
        { title: 'Priority 24/7 support', included: true },
        { title: 'Custom dashboard', included: true },
        { title: 'Custom approval policies', included: true },
        { title: 'Automated license management', included: true },
        { title: 'ERP and Payments system integration', included: true },
      ],
      delay: 2,
    },
  ];

  return (
    <section 
      id="pricing" 
      ref={sectionRef}
      className="relative py-20 bg-slate-100 dark:bg-slate-900/80"
    >
      {/* Fondo sutil */}
      <div className="absolute inset-0 tech-grid opacity-10"></div>
      
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
            <span className="text-slate-800 dark:text-slate-200"></span> 
            <span className="text-blue-600 dark:text-blue-400 ml-2">PRICING</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Contact us to get a custom quote for your organization.
          </p>
        </motion.div>

        <div className="flex justify-center gap-8 flex-wrap">
          {plans.map((plan, index) => (
            <div className="w-[400px]" key={index}>
              <PricingCard
                {...plan}
              />
            </div>
          ))}
        </div>
        

      </div>
    </section>
  );
};

export default Pricing; 