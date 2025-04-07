"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useContactForm } from '@/contexts/ContactFormContext';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-6 py-4 text-left flex justify-between items-center transition-colors ${
          isOpen 
            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' 
            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200'
        }`}
      >
        <span className="font-medium">{question}</span>
        <svg 
          className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen 
            ? 'max-h-96' 
            : 'max-h-0'
        }`}
      >
        <div className="p-6 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          <p>{answer}</p>
        </div>
      </div>
    </motion.div>
  );
};

const FAQ: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const controls = useAnimation();
  const { openContactForm } = useContactForm();
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);
  
  const faqItems = [
    {
      question: "How does SoftCheck optimize license costs for the finance department?",
      answer: "SoftCheck identifies unutilized licenses and prevents unnecessary automatic renewals. Also awares your finance department when a new license is needed. Our clients typically reduce their license costs by 25-30% during the first year."
    },
    {
      question: "What specific benefits does it offer for IT departments?",
      answer: "For IT, SoftCheck automates the software approval, implementation, and renewal processes, reducing administrative burden and allowing technical teams to focus on higher-value tasks. It also offers a centralized view of all corporate software, facilitating compliance with security policies."
    },
    {
      question: "How does it integrate with other systems?",
      answer: "SoftCheck integrates with most ERP, Financial and Cybersecurity systems through APIs and preconfigured connectors." 
    },
    {
      question: "How long does it take to implement the solution?",
      answer: "Basic implementation is usually completed in 2-4 weeks. For enterprise configurations with custom integrations, the estimated time is 4-8 weeks. Our team provides complete support throughout the process, including data migration, configuration, and training for all departments."
    },
    {
      question: "What level of customization does it offer for different departments?",
      answer: "SoftCheck allows customization of workflows and approval policies."
    },
    {
      question: "How does SoftCheck help with regulatory?",
      answer: "SoftCheck includes specific features for regulatory compliance, such as software inventory and vulnerability management."
    }
  ];
  
  return (
    <section id="faq" ref={ref} className="py-20 bg-slate-50 dark:bg-slate-900/80">
      <div className="container-section">
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
            <span className="text-slate-800 dark:text-slate-200">FREQUENTLY</span> 
            <span className="text-blue-600 dark:text-blue-400 ml-2">ASKED QUESTIONS</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We answer your questions about how SoftCheck can optimize software and license management in your company.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              index={index}
            />
          ))}
        </div>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.8 } }
          }}
          className="text-center mt-12 max-w-2xl mx-auto"
        >
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Can't find an answer to your question?
          </p>
          <button 
            onClick={(e) => openContactForm()}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            CONTACT US
            <svg 
              className="w-5 h-5 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 