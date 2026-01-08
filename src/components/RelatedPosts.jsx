"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RelatedPosts({ currentPostId, allPosts }) {
  // Get 3 random posts that are not the current one
  const related = allPosts
    .filter(p => p.id !== currentPostId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
      {related.map((post, idx) => (
        <Link href={`/blog/${post.slug || post.id}`} key={post.id} className="group block">
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col h-full"
          >
            <div className="overflow-hidden rounded-lg mb-6 aspect-[4/3] bg-[var(--color-border)] relative">
              {post.image_url ? (
                <>
                    <img 
                        src={post.image_url} 
                        alt={post.title}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-[var(--color-border)] group-hover:ring-[var(--color-button-bg)]/30 transition-all"></div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--color-primary)] font-mono text-xs uppercase tracking-widest">
                    No Image
                </div>
              )}
            </div>
            
            <div className="flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-border)] group-hover:bg-[var(--color-button-bg)] transition-colors"></span>
                    <span className="text-[10px] font-mono text-[var(--color-primary)] uppercase tracking-widest group-hover:text-[var(--color-button-bg)] transition-colors">
                        {post.category}
                    </span>
                </div>
                
                <h4 className="text-lg md:text-xl font-bold text-[var(--color-foreground)] group-hover:text-[var(--color-button-bg)] transition-colors leading-tight mb-4">
                    {post.title}
                </h4>

                <p className="text-sm text-[var(--color-primary)] line-clamp-2 mt-auto font-light leading-relaxed group-hover:text-[var(--color-secondary)] transition-colors">
                    {post.excerpt}
                </p>
            </div>
          </motion.article>
        </Link>
      ))}
    </div>
  );
}
