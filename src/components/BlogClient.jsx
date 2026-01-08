"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { GlitchText } from './ui/GlitchText';
import BlogHeader from './BlogHeader';
import BlogFooter from './BlogFooter';

export default function BlogClient({ posts = [] }) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Extract unique categories
  const categories = useMemo(() => {
    if (!posts) return ['All'];
    const cats = ['All', ...new Set(posts.map(post => post.category).filter(Boolean))];
    return cats;
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    if (selectedCategory === 'All') return posts;
    return posts.filter(post => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] relative overflow-hidden font-sans selection:bg-[var(--color-button-bg)] selection:text-white">
      
      {/* Blog Header */}
      <BlogHeader />

      {/* Background Elements - Minimal & Smooth */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[var(--color-background)] via-transparent to-[var(--color-background)]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 pt-32 md:pt-40">
        
        {/* Header Section */}
        <header className="mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-6"
          >
            <div className="inline-block px-3 py-1 text-xs font-mono border border-[var(--color-button-bg)] text-[var(--color-button-bg)] rounded-full uppercase tracking-wider mb-2">
              Pensamientos & Ideas
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[var(--color-foreground)] leading-[0.9]">
              <GlitchText text={t('blog.title') || 'DIGITAL'} className="block" />
              <span className="block text-[var(--color-button-bg)]/80">JOURNAL</span>
            </h1>
            
            <p className="max-w-xl text-lg md:text-xl text-[var(--color-primary)] leading-relaxed mt-4">
              {t('blog.subtitle') || 'Explorando los límites de la tecnología, diseño e innovación digital. Una colección de pensamientos sobre el futuro de la web.'}
            </p>
          </motion.div>

          {/* Categories Navigation */}
          {categories.length > 1 && (
            <motion.nav 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex overflow-x-auto gap-8 mt-16 pb-4 border-b border-[var(--color-border)] no-scrollbar"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative text-sm uppercase tracking-widest py-4 transition-colors duration-300 whitespace-nowrap
                    ${selectedCategory === category ? 'text-[var(--color-foreground)] font-bold' : 'text-[var(--color-primary)] hover:text-[var(--color-foreground)]'}
                  `}
                >
                  {category}
                  {selectedCategory === category && (
                    <motion.div 
                      layoutId="activeCategory"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-button-bg)]"
                    />
                  )}
                </button>
              ))}
            </motion.nav>
          )}
        </header>

        {/* Posts Grid - Minimal List Layout for Awwwards feel */}
        <div className="flex flex-col gap-8 md:gap-0">
            <AnimatePresence mode="wait">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative border-b border-[var(--color-border)] last:border-0 md:py-16 py-8"
                    onMouseEnter={() => setHoveredCard(post.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Link href={`/blog/${post.slug || post.id}`} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center cursor-none-target">
                      
                      {/* Date & Category */}
                      <div className="md:col-span-2 flex flex-col justify-between h-full text-xs md:text-sm text-[var(--color-primary)] font-mono uppercase tracking-wider">
                        <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                        <span className="mt-2 text-[var(--color-button-bg)]">{post.category}</span>
                      </div>
                      
                      {/* Title & Excerpt */}
                      <div className="md:col-span-6">
                        <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-foreground)] mb-4 group-hover:text-[var(--color-button-bg)] transition-colors duration-300">
                          {post.title}
                        </h2>
                        <p className="text-[var(--color-primary)] text-lg line-clamp-2 md:line-clamp-none opacity-80 group-hover:opacity-100 transition-opacity">
                          {post.excerpt || post.content?.substring(0, 150) + '...'}
                        </p>
                        
                        <div className="mt-8 flex items-center text-sm font-bold uppercase tracking-widest overflow-hidden">
                           <span className="transform translate-y-0 group-hover:-translate-y-full transition-transform duration-300 text-[var(--color-foreground)]">Read Article</span>
                           <span className="absolute transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-[var(--color-button-bg)]">Read Article</span>
                           <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                           </svg>
                        </div>
                      </div>

                      {/* Image Preview (Reveals on larger screens or just displayed) */}
                      <div className="md:col-span-4 relative h-[250px] md:h-[300px] overflow-hidden rounded-lg md:rounded-none">
                        <div className="absolute inset-0 bg-[var(--color-button-bg)]/10 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay"></div>
                         {post.image_url ? (
                           <motion.img 
                            src={post.image_url} 
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                            style={{ scale: hoveredCard === post.id ? 1.05 : 1 }}
                           />
                         ) : (
                           <div className="w-full h-full bg-[var(--color-secondary)]/10 flex items-center justify-center">
                             <span className="text-6xl opacity-10">POST</span>
                           </div>
                         )}
                      </div>

                    </Link>
                  </motion.article>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-24 text-center"
                >
                  <p className="text-2xl text-[var(--color-primary)] font-light">No stories found yet.</p>
                  <button onClick={() => setSelectedCategory('All')} className="mt-4 text-[var(--color-button-bg)] underline">Clear filters</button>
                </motion.div>
              )}
            </AnimatePresence>
        </div>

      </div>

      {/* Blog Footer */}
      <BlogFooter />
    </div>
  );
}
