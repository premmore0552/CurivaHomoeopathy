import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Facebook, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  return (
    <div className="pt-24 pb-16 min-h-[80vh] flex items-center">
      <SEO 
        title="Contact Us - Curiva Homoeopathy" 
        description="Connect with Curiva Homoeopathy on social media for inquiries and updates."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Connect With Us</h1>
          <p className="text-xl text-gray-600 mb-12">
            For inquiries, feedback, or educational support, please reach out to us on our social media platforms.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <a 
              href="https://www.instagram.com/curivahomoeopathy/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-primary transition-all flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Instagram size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Instagram</h3>
                <p className="text-gray-500 text-sm mb-4">@curivahomoeopathy</p>
                <div className="flex items-center gap-2 text-primary font-semibold group-hover:underline">
                  Follow Us <ExternalLink size={14} />
                </div>
              </div>
            </a>

            <a 
              href="https://www.facebook.com/curivahomoeopathy/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-primary transition-all flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 bg-[#1877F2] text-white rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Facebook size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Facebook</h3>
                <p className="text-gray-500 text-sm mb-4">curivahomoeopathy</p>
                <div className="flex items-center gap-2 text-primary font-semibold group-hover:underline">
                  Like Our Page <ExternalLink size={14} />
                </div>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
