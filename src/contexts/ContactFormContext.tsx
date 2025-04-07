"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import ContactForm from '@/components/ContactForm';

type ContactFormContextType = {
  openContactForm: (planName?: string) => void;
  closeContactForm: () => void;
  isContactFormOpen: boolean;
  selectedPlan: string | null;
};

const ContactFormContext = createContext<ContactFormContextType | undefined>(undefined);

export const ContactFormProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const openContactForm = (planName?: string) => {
    if (planName) {
      setSelectedPlan(planName);
    }
    setIsOpen(true);
  };
  
  const closeContactForm = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedPlan(null), 300); // Reset después del cierre
  };

  return (
    <ContactFormContext.Provider value={{ 
      openContactForm, 
      closeContactForm, 
      isContactFormOpen: isOpen,
      selectedPlan
    }}>
      {children}
      <ContactForm isOpen={isOpen} onClose={closeContactForm} planName={selectedPlan} />
    </ContactFormContext.Provider>
  );
};

export const useContactForm = (): ContactFormContextType => {
  const context = useContext(ContactFormContext);
  if (context === undefined) {
    throw new Error('useContactForm debe ser usado dentro de un ContactFormProvider');
  }
  return context;
}; 