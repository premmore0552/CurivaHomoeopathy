import React, { useEffect } from 'react';
import { Instagram, ArrowRight, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const InstagramFeed: React.FC = () => {
    useEffect(() => {
        // Load Elfsight platform script dynamically
        const script = document.createElement('script');
        script.src = "https://elfsightcdn.com/platform.js";
        script.async = true;
        document.head.appendChild(script);
    }, []);

    return (
        <section className="py-24 bg-bg-secondary border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full text-primary mb-8 font-bold"
                >
                    <Instagram className="w-6 h-6" />
                    <span>From Instagram</span>
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-12"
                >
                    Live From <span className="text-primary italic">Instagram</span>
                </motion.h2>

                <p className="text-text-secondary max-w-xl mx-auto mb-10">
                  Real-time updates, insights, and homoeopathy awareness from our Instagram community.
                </p>

                {/* Elfsight Widget Container */}
                <div className="rounded-2xl overflow-hidden shadow-xl bg-bg-primary border border-border min-h-[400px]">
                    <div 
                        className="elfsight-app-c2c39883-97e4-476c-b799-06a120419860" 
                        data-elfsight-app-lazy 
                    />
                </div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-12 flex gap-4 justify-center"
                >
                    <a href="https://www.instagram.com/curivahomoeopathy/" target="_blank" rel="noopener noreferrer" className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-bold rounded-2xl flex items-center gap-3 hover:scale-105 transition-all shadow-lg hover:shadow-orange-500/25">
                        <Instagram className="w-5 h-5" />
                        Follow on Instagram 
                    </a>
                </motion.div>
            </div>
        </section>
    );
};
