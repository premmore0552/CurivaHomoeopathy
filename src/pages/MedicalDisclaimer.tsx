import React from 'react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';
import { AlertTriangle } from 'lucide-react';

export default function MedicalDisclaimer() {
  return (
    <div className="pt-24 pb-16 bg-bg-primary transition-colors duration-300">
      <SEO 
        title="Medical Disclaimer - Curiva Homoeopathy" 
        description="Important medical disclaimer regarding the information provided on Curiva Homoeopathy."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-amber-100 rounded-full text-amber-600">
              <AlertTriangle size={32} />
            </div>
            <h1 className="text-4xl font-serif font-bold text-primary">Medical Disclaimer</h1>
          </div>
          
          <div className="prose prose-lg max-w-none text-text-secondary space-y-6 dark:prose-invert">
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-6 mb-8 rounded-r-lg">
              <p className="text-amber-900 dark:text-amber-200 font-bold mb-2 uppercase tracking-wider text-sm">Educational Notice & Student Project</p>
              <p className="text-amber-800 dark:text-amber-300">
                Curiva Homoeopathy is an educational research platform maintained and curated by a BHMS student. The information provided is for educational and informational purposes only and is not intended as medical advice, professional diagnosis, or treatment. We do not offer or facilitate medical consultations.
              </p>
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">1. No Professional Advice</h2>
            <p>
              The content on this website, including text, graphics, images, and other materials, is not a substitute for professional medical advice. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">2. No Doctor-Patient Relationship</h2>
            <p>
              Your use of this website does not create a doctor-patient relationship between you and Curiva Homoeopathy or its contributors.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">3. Homoeopathic Information</h2>
            <p>
              Homoeopathy is a holistic system of medicine. The descriptions of remedies and their uses are based on traditional homoeopathic literature and Materia Medica. Individual results may vary, and what works for one person may not work for another.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">4. Emergency Situations</h2>
            <p>
              Never disregard professional medical advice or delay in seeking it because of something you have read on this website. If you think you may have a medical emergency, call your doctor or emergency services immediately.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">5. Accuracy of Information</h2>
            <p>
              While we strive to provide accurate and up-to-date information, medical knowledge is constantly evolving. Curiva Homoeopathy makes no representations or warranties in relation to the medical information on this website.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">6. Limitation of Liability</h2>
            <p>
              Curiva Homoeopathy and its authors are not liable for any direct, indirect, or consequential damages arising from the use of information provided on this website.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
