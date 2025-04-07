import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  CommandLineIcon, 
  DocumentChartBarIcon, 
  ShieldCheckIcon, 
  ArrowPathIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  ArrowLongRightIcon 
} from '@heroicons/react/24/outline';
import { useContactForm } from '@/contexts/ContactFormContext';

interface FeatureItem {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface FeatureCardProps extends FeatureItem {
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ 
    threshold: 0.1,
    triggerOnce: true 
  });

  // Combine refs
  const setRefs = (element: HTMLDivElement) => {
    // @ts-ignore - This is a valid approach to combine refs
    cardRef.current = element;
    ref(element);
  };

  return (
    <motion.div
      ref={setRefs}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
    >
      <div className="flex">
        <div className="flex-shrink-0 mr-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400">
            {icon}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">
            {title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref, inView } = useInView({ 
    threshold: 0.1,
    triggerOnce: true 
  });
  const controls = useAnimation();
  const { openContactForm } = useContactForm();

  // Combine refs
  const setRefs = (element: HTMLElement) => {
    // @ts-ignore - This is a valid approach to combine refs
    sectionRef.current = element;
    ref(element);
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const featuresData: FeatureItem[] = [
    {
      icon: <CommandLineIcon className="w-6 h-6" />,
      title: "Process Automation",
      description: "Automate repetitive workflows and increase your department's productivity."
    },
    {
      icon: <DocumentChartBarIcon className="w-6 h-6" />,
      title: "Financial Reports",
      description: "Generate detailed reports for more informed financial decision-making."
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      title: "Advanced Security",
      description: "Protect your company's sensitive data with our enterprise-level security measures."
    },
    {
      icon: <ArrowPathIcon className="w-6 h-6" />,
      title: "Flexible Integration",
      description: "Connect with your existing systems easily and without technical complications."
    },
    {
      icon: <UserGroupIcon className="w-6 h-6" />,
      title: "Team Management",
      description: "Improve collaboration and human resource management throughout your department."
    },
    {
      icon: <ChartBarIcon className="w-6 h-6" />,
      title: "Data Analysis",
      description: "Gain valuable insights from your business data to optimize operations."
    }
  ];

  return (
    <section id="features" ref={setRefs} className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container-section">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <span className="text-slate-800 dark:text-slate-200">MAIN</span>
            <span className="text-blue-600 dark:text-blue-400 ml-2">FEATURES</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Features specifically designed to enhance the performance of your finance and IT departments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.6 } }
          }}
          className="mt-16 text-center"
        >
          <button 
            onClick={(e) => openContactForm()}
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors"
          >
            REQUEST DEMO
            <ArrowLongRightIcon className="w-5 h-5 ml-2" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features; 