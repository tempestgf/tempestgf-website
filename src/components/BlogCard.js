"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { formatDate, calculateReadingTime } from '@/lib/blogUtils';

export default function BlogCard({ post, index = 0 }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative"
        >
            <Link href={`/blog/${post.slug}`}>
                <div className="relative overflow-hidden rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] transition-all duration-500 hover:border-[var(--color-button-bg)]/50 hover:shadow-2xl">
                    {/* Featured Image */}
                    {post.featuredImage && (
                        <div className="relative h-64 w-full overflow-hidden bg-[var(--gray-800)]">
                            <motion.img
                                src={post.featuredImage}
                                alt={post.title}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent opacity-60" />

                            {/* Category Badge */}
                            {post.category && (
                                <div className="absolute top-4 left-4">
                                    <span className="px-4 py-2 bg-[var(--color-button-bg)] text-white text-xs font-bold uppercase tracking-wider rounded-full">
                                        {post.category}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-6 md:p-8">
                        {/* Meta Info */}
                        <div className="flex items-center gap-4 mb-4 text-sm text-[var(--color-primary)]">
                            <time dateTime={post.createdAt}>
                                {formatDate(post.createdAt)}
                            </time>
                            <span>•</span>
                            <span>{calculateReadingTime(post.content)} min lectura</span>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--color-foreground)] group-hover:text-[var(--color-button-bg)] transition-colors duration-300">
                            {post.title}
                        </h2>

                        {/* Excerpt */}
                        {post.excerpt && (
                            <p className="text-[var(--color-primary)] mb-6 line-clamp-3 leading-relaxed">
                                {post.excerpt}
                            </p>
                        )}

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {post.tags.slice(0, 3).map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-[var(--gray-100)] dark:bg-[var(--gray-800)] text-[var(--color-foreground)] text-xs rounded-full"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Read More Link */}
                        <div className="flex items-center text-[var(--color-button-bg)] font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
                            <span>Leer más</span>
                            <motion.svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </motion.svg>
                        </div>
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                        <div className="absolute bottom-0 right-0 w-full h-full border-r-2 border-b-2 border-[var(--color-button-bg)]" />
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
