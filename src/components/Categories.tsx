import React from 'react';
import { categories } from '../data/mockData';
import * as Icons from 'lucide-react';
import { motion } from 'motion/react';

const Categories: React.FC = () => {
  return (
    <section className="py-20 bg-soft-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icons.LayoutGrid className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-display font-bold text-gray-900">Explore by Category</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find exactly what you're looking for by browsing our specialized educational categories.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const IconComponent = (Icons as any)[category.icon];
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group p-8 bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  {IconComponent && <IconComponent className="w-7 h-7" />}
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-3">{category.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {category.description}
                </p>
                <span className="text-primary font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  Browse Category <Icons.ChevronRight className="w-3 h-3" />
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
