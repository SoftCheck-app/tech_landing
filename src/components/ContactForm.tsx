"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Inicializar EmailJS (estos IDs los obtendrás de tu cuenta de EmailJS)
emailjs.init("5SZj4gArNd4Dpag0R");

// Componente para el formulario de contacto modal
const ContactForm = ({ isOpen, onClose, planName }: { isOpen: boolean; onClose: () => void; planName: string | null }) => {
  const form = useRef<HTMLFormElement>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string; submit?: string }>({});

  // Cerrar modal con la tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevenir el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Validar el formulario
  const validateForm = () => {
    const newErrors: { name?: string; phone?: string; email?: string } = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = 'El número de teléfono es obligatorio';
      isValid = false;
    } else if (!/^[+\d\s()-]{9,20}$/.test(phone)) {
      newErrors.phone = 'Ingresa un número de teléfono válido';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'El email es obligatorio';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Ingresa un email válido';
      isValid = false;
    } else if (!email.includes('.') || email.endsWith('.')) {
      newErrors.email = 'Ingresa un email profesional válido';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm() && form.current) {
      try {
        const result = await emailjs.sendForm(
          'service_7xwiksh',
          'template_owe9uab',
          form.current,
          '5SZj4gArNd4Dpag0R'
        );

        if (result.text === 'OK') {
          setSubmitted(true);
          
          // Resetear el formulario después de enviar
          setTimeout(() => {
            setName('');
            setPhone('');
            setEmail('');
            setSubmitted(false);
            onClose();
          }, 2000);
        } else {
          setErrors(prev => ({
            ...prev,
            submit: 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.'
          }));
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        setErrors(prev => ({
          ...prev,
          submit: 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.'
        }));
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay con efecto de desenfoque */}
          <motion.div 
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div 
            className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-xl relative overflow-hidden border border-slate-200 dark:border-slate-700"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* Borde con gradiente */}
            <div className="absolute inset-0 rounded-2xl border-4 border-transparent bg-gradient-to-r from-cyan-500/20 to-blue-500/20 -z-10 pointer-events-none"></div>
            
            {/* Header */}
            <div className="relative p-6 pb-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                Request information
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Complete the form and we will contact you asap!
              </p>
              <button 
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                onClick={onClose}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Formulario */}
            <div className="p-6">
              {submitted ? (
                <motion.div 
                  className="text-center py-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="mb-4 text-green-500 dark:text-green-400 flex justify-center">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">We will contact you soon.</h4>
                </motion.div>
              ) : (
                <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="from_name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Full name
                    </label>
                    <input 
                      type="text" 
                      id="from_name"
                      name="from_name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500 dark:border-red-400' : 'border-slate-300 dark:border-slate-600'} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Phone number
                    </label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full px-4 py-2 border ${errors.phone ? 'border-red-500 dark:border-red-400' : 'border-slate-300 dark:border-slate-600'} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                      placeholder="+34 XXX XXX XXX"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="from_email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Professional email
                    </label>
                    <input 
                      type="email" 
                      id="from_email"
                      name="from_email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500 dark:border-red-400' : 'border-slate-300 dark:border-slate-600'} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100`}
                      placeholder="name@company.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>
                    )}
                  </div>

                  <input type="hidden" name="to_email" value="softcheck.app@gmail.com" />
                  <input type="hidden" name="plan" value={planName || "No especificado"} />
                  <input type="hidden" name="reply_to" value={email} />
                  
                  <div className="pt-2">
                    <button 
                      type="submit" 
                      className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all shadow-lg shadow-cyan-500/30"
                    >
                      Send request
                    </button>
                    {errors.submit && (
                      <p className="mt-2 text-sm text-red-500 dark:text-red-400 text-center">{errors.submit}</p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactForm; 