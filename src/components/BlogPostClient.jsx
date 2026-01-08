"use client";

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import RelatedPosts from './RelatedPosts';
import BlogHeader from './BlogHeader';
import BlogFooter from './BlogFooter';
import { mockPosts } from '@/app/blog/mockData';

export default function BlogPostClient({ post }) {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  
  // Smooth scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track progress for header
  useEffect(() => {
    return scrollYProgress.onChange((v) => setProgress(v));
  }, [scrollYProgress]);

  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.2]);

  const imageUrl = post.image_url || null;

  return (
    <div ref={containerRef} className="bg-[var(--color-background)] text-[var(--color-foreground)] font-sans selection:bg-[var(--color-button-bg)]/30 selection:text-white min-h-screen">
      
      {/* Blog Header */}
      <BlogHeader progress={progress} />

      {/* Immersive Hero Section */}
      <header className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          {imageUrl ? (
            <motion.div className="w-full h-full" style={{ scale: imageScale, opacity: heroOpacity }}>
               <img src={imageUrl} alt={post.title} className="w-full h-full object-cover brightness-[0.4] saturate-[0.8]" />
               <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/40 via-transparent to-[var(--color-background)]" />
            </motion.div>
          ) : (
             <div className="w-full h-full bg-[var(--color-background)]" />
          )}
        </div>

        <div className="absolute inset-0 z-10 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>

        <div className="relative z-20 max-w-[90vw] md:max-w-5xl mx-auto px-4 text-center mt-16">
          <motion.div style={{ y: titleY }} className="flex flex-col items-center">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center gap-6 mb-12 text-[var(--color-button-bg)] font-mono text-xs md:text-sm uppercase tracking-[0.3em]"
            >
              <span className="px-3 py-1 border border-[var(--color-button-bg)]/30 rounded-full">{post.category}</span>
              <span>—</span>
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-8xl font-bold text-[var(--color-foreground)] tracking-tighter leading-[0.95] mb-12 text-balance"
            >
              {post.title}
            </motion.h1>

            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1, duration: 1 }}
               className="flex flex-col md:flex-row items-center gap-6 text-sm md:text-base text-[var(--color-primary)] max-w-2xl font-light leading-relaxed"
            >
              {post.excerpt}
            </motion.div>
          </motion.div>
        </div>

        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 1.5}} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-primary)]">
           <span className="text-[10px] uppercase tracking-widest">Scroll</span>
           <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-primary)] to-transparent"></div>
        </motion.div>
      </header>

      <div className="relative z-30 bg-[var(--color-background)]">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 py-32">
          
          {/* Sticky Sidebar (Left) */}
          <aside className="hidden lg:block lg:col-span-2 relative">
             <div className="sticky top-32 flex flex-col items-start gap-8">
                {post.author && (
                  <div className="group">
                    <p className="text-[10px] uppercase tracking-widest text-[var(--color-primary)] mb-2">Escrito por</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--color-button-bg)]/10 flex items-center justify-center text-[var(--color-button-bg)] font-bold border border-[var(--color-border)]">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[var(--color-foreground)] group-hover:text-[var(--color-button-bg)] transition-colors">{post.author}</p>
                        <p className="text-xs text-[var(--color-primary)]">{post.author_role}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="w-full h-[1px] bg-[var(--color-border)] my-2"></div>

                <div>
                   <p className="text-[10px] uppercase tracking-widest text-[var(--color-primary)] mb-4">Compartir</p>
                   <div className="flex flex-col gap-4">
                      <SocialLink icon="twitter" label="Twitter" />
                      <SocialLink icon="linkedin" label="LinkedIn" />
                      <SocialLink icon="facebook" label="Facebook" />
                   </div>
                </div>
             </div>
          </aside>

          {/* Main Content (Center) */}
          <article className="lg:col-span-8 lg:col-start-4">
             <div className="
                prose prose-xl max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[var(--color-foreground)]
                prose-h2:text-3xl prose-h2:mt-20 prose-h2:mb-8
                prose-h3:text-xl prose-h3:text-[var(--color-button-bg)]
                prose-p:text-[var(--color-secondary)] prose-p:leading-[1.9] prose-p:font-light
                prose-strong:text-[var(--color-foreground)] prose-strong:font-semibold
                prose-a:text-[var(--color-button-bg)] prose-a:no-underline prose-a:border-b prose-a:border-[var(--color-button-bg)]/30 hover:prose-a:border-[var(--color-button-bg)] prose-a:transition-all
                prose-blockquote:border-l-4 prose-blockquote:border-[var(--color-button-bg)] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:text-[var(--color-foreground)] prose-blockquote:font-serif prose-blockquote:bg-[var(--color-button-bg)]/5 prose-blockquote:py-4 prose-blockquote:pr-6 prose-blockquote:rounded-r-lg
                prose-ul:my-8 prose-ul:list-disc prose-ul:pl-6
                prose-li:text-[var(--color-secondary)] prose-li:marker:text-[var(--color-button-bg)]
                prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-[var(--color-border)] prose-pre:rounded-xl prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:shadow-xl
                prose-code:bg-transparent prose-code:text-[var(--color-button-bg)] prose-code:font-mono prose-code:text-sm
                prose-img:rounded-xl prose-img:w-full prose-img:shadow-xl prose-img:border prose-img:border-[var(--color-border)] prose-img:my-12
                prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:text-[var(--color-primary)] prose-figcaption:mt-4
             "
             dangerouslySetInnerHTML={{ __html: post.content }}
             />

             {/* Footer Tags */}
             {post.tags && post.tags.length > 0 && (
                <div className="mt-20 pt-10 border-t border-[var(--color-border)] flex flex-wrap gap-3">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="px-4 py-2 border border-[var(--color-border)] text-[var(--color-primary)] text-xs uppercase tracking-widest rounded-full hover:border-[var(--color-button-bg)] hover:text-[var(--color-button-bg)] transition-colors cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
            )}
          </article>

          {/* Right Gutter */}
          <div className="hidden lg:block lg:col-span-1"></div>
        </div>
      </div>
      
      {/* Related Posts Section */}
      <section className="bg-[var(--color-background)] py-24 border-t border-[var(--color-border)]">
         <div className="container mx-auto px-4">
             <h3 className="text-2xl md:text-4xl font-bold text-center mb-16 tracking-tight text-[var(--color-foreground)]">Sigue Leyendo</h3>
             <RelatedPosts currentPostId={post.id} allPosts={mockPosts} />
         </div>
      </section>

      {/* Blog Footer */}
      <BlogFooter />
    </div>
  );
}

function SocialLink({ icon, label }) {
  return (
    <button className="group flex items-center gap-3 text-[var(--color-primary)] hover:text-[var(--color-button-bg)] transition-colors">
       <span className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center group-hover:border-[var(--color-button-bg)] group-hover:bg-[var(--color-button-bg)]/10 transition-all text-sm">
         {label[0]}
       </span>
       <span className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 transform duration-300">
         {label}
       </span>
    </button>
  );
}
