import React from 'react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <div className="pt-24 pb-16 bg-bg-primary transition-colors duration-300">
      <SEO 
        title="Privacy Policy - Curiva Homoeopathy" 
        description="Our commitment to your privacy and data protection at Curiva Homoeopathy."
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-serif font-bold text-primary mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-text-secondary space-y-6 dark:prose-invert">
            <p className="text-sm text-text-secondary italic">Last Updated: March 5, 2026</p>
            
            <p>
              At Curiva Homoeopathy, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you interact with our website.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">1. Information We Collect</h2>
            <p>
              We collect minimal information to support our educational mission. The types of information we collect include:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Contact Information:</strong> Email address only if you voluntarily subscribe to our newsletter or provide feedback.</li>
              <li><strong>Feedback Data:</strong> Any comments or error reports you submit through our feedback forms. <strong>We do not collect or store patient medical history or clinical health data.</strong></li>
              <li><strong>Usage Data:</strong> Non-personal information automatically collected through cookies, such as IP address and browser type to understand how users interact with our research content.</li>
            </ul>
            
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">2. How We Use Your Information</h2>
            <p>We use your data strictly for educational and feedback-related purposes:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>To improve our educational resources based on user feedback.</li>
              <li>To send you research updates and homoeopathic awareness newsletters if subscribed.</li>
              <li>To respond to your specific inquiries or content suggestions.</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">3. Data Security & Integrity</h2>
            <p>
              While we do not store health records, we implement standard security measures to protect your contact information and feedback. We do not sell or share any user data with third-party pharmaceutical or medical marketing firms.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">4. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to read their privacy policies.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. You can unsubscribe from our newsletter at any time by clicking the "unsubscribe" link in our emails.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-text-primary mt-12 mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@curiva.com.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
