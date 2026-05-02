import React from 'react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

export default function TermsOfService() {
  return (
    <div className="pt-24 pb-16 bg-bg-primary transition-colors duration-300">
      <SEO 
        title="Terms of Service - Curiva Homoeopathy" 
        description="Terms and conditions for using the Curiva Homoeopathy website and educational resources."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-serif font-bold text-primary mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none text-text-secondary space-y-6 dark:prose-invert">
            <p className="text-sm text-text-secondary italic">Last Updated: March 5, 2026</p>
            
            <p>
              Welcome to Curiva Homoeopathy. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions of use.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">1. Acceptance of Terms</h2>
            <p>
              By using this website, you signify your acceptance of these Terms of Service. If you do not agree to these terms, please do not use our site. We reserve the right to modify these terms at any time without prior notice.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">2. Educational & Student Project Status</h2>
            <p>
              Curiva is an educational research project maintained by a BHMS student. It is not a registered medical clinic and does not offer clinical services. All content provided is for academic and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. You agree not to use this site for self-diagnosis or to replace professional medical care.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">3. No Doctor-Patient Relationship</h2>
            <p>
              Your use of Curiva Homoeopathy, including the submission of feedback or the use of the Symptom Map tool, does not create a doctor-patient relationship. Communications through this site are for educational purposes and are not confidential medical consultations.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">4. Intellectual Property</h2>
            <p>
              The content, layout, design, data, databases and graphics on this website are protected by intellectual property laws. You may not reproduce, download, transmit, or distribute any part of this website without our prior written consent, except for personal, non-commercial use.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">5. User Conduct</h2>
            <p>
              You agree to use the website only for lawful purposes. You are prohibited from posting or transmitting any material that is defamatory, offensive, or otherwise violates the rights of others.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">6. Limitation of Liability</h2>
            <p>
              Curiva Homoeopathy will not be liable for any damages of any kind arising from the use of this site, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-gray-900 mt-12 mb-4">7. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Curiva Homoeopathy operates.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">8. Contact Information</h2>
            <p>
              If you have any questions regarding these Terms of Service, please contact us at legal@curiva.com.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
