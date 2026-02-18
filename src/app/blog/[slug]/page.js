"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { formatDate, calculateReadingTime } from '@/lib/blogUtils';

export default function BlogPostPage() {
    const params = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        if (params.slug) {
            fetchPost();
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [params.slug]);

    const fetchPost = async () => {
        try {
            const response = await fetch('/api/blog');
            const data = await response.json();

            if (data.success) {
                const foundPost = data.posts.find(p => p.slug === params.slug);

                if (foundPost) {
                    setPost(foundPost);

                    const related = data.posts
                        .filter(p => p.id !== foundPost.id && p.category === foundPost.category)
                        .slice(0, 3);
                    setRelatedPosts(related);
                }
            }
        } catch (error) {
            console.error('Error fetching post:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[var(--color-button-bg)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[var(--color-primary)] text-lg">Cargando artículo...</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
                <div className="text-center max-w-md">
                    <h1 className="text-4xl font-bold mb-4 text-[var(--color-foreground)]">
                        Artículo no encontrado
                    </h1>
                    <p className="text-[var(--color-primary)] mb-8">
                        El artículo que buscas no existe o ha sido eliminado.
                    </p>
                    <Link
                        href="/blog"
                        className="inline-block px-8 py-4 bg-[var(--color-button-bg)] text-white rounded-xl font-semibold hover:bg-[var(--color-button-bg-hover)] transition-colors"
                    >
                        Volver al Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            {/* Fixed Header with Progress */}
            <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[var(--color-background)]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 h-1 bg-[var(--color-button-bg)]/20 w-full">
                    <motion.div
                        className="h-full bg-[var(--color-button-bg)]"
                        style={{ width: `${scrollProgress}%` }}
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-[var(--color-foreground)] hover:text-[var(--color-button-bg)] transition-colors">
                            Tempestgf
                        </span>
                    </Link>

                    <Link href="/blog" className="flex items-center gap-2 text-[var(--color-foreground)] hover:text-[var(--color-button-bg)] transition-colors font-medium">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver al Blog
                    </Link>
                </div>
            </header>

            {/* Hero Section with Advanced Design */}
            <section className="relative pt-24 pb-16 overflow-hidden">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-button-bg)]/10 via-purple-500/5 to-transparent" />

                {/* Floating Decorative Elements */}
                <div className="absolute top-40 right-10 w-96 h-96 bg-[var(--color-button-bg)]/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />

                <div className="relative max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Category Badge with Glow */}
                        {post.category && (
                            <motion.span
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-block relative px-5 py-2 bg-[var(--color-button-bg)] text-white text-sm font-bold uppercase tracking-wider rounded-full mb-8"
                            >
                                <div className="absolute inset-0 bg-[var(--color-button-bg)] rounded-full blur-lg opacity-50" />
                                <span className="relative">{post.category}</span>
                            </motion.span>
                        )}

                        {/* Giant Title with Line Breaks */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[var(--color-foreground)] leading-[1.1] mb-8 tracking-tight">
                            {post.title}
                        </h1>

                        {/* Excerpt with Premium Typography */}
                        {post.excerpt && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl md:text-3xl text-[var(--color-primary)] font-light leading-relaxed mb-10 max-w-3xl"
                            >
                                {post.excerpt}
                            </motion.p>
                        )}

                        {/* Meta Information with Icons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap items-center gap-6 text-[var(--color-primary)]"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-[var(--color-button-bg)] rounded-full flex items-center justify-center text-white font-bold">
                                    {(post.author || 'A')[0].toUpperCase()}
                                </div>
                                <span className="font-medium">{post.author || 'Admin'}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <time>{formatDate(post.createdAt)}</time>
                            </div>

                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{calculateReadingTime(post.content)} min de lectura</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Content Area with Better Typography */}
            <article className="relative py-16">
                {/* Side Decorative Line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--color-button-bg)]/30 to-transparent hidden lg:block ml-8" />

                <div className="max-w-4xl mx-auto px-6">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="blog-content prose prose-lg prose-headings:text-[var(--color-foreground)] prose-p:text-[var(--color-primary)] prose-a:text-[var(--color-button-bg)] prose-strong:text-[var(--color-foreground)] prose-code:text-[var(--color-button-bg)] prose-pre:bg-[var(--gray-900)] prose-pre:text-[var(--gray-100)] max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Tags Cloud */}
                    {post.tags && post.tags.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-16 pt-8 border-t-2 border-[var(--color-border)]"
                        >
                            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary)] mb-4">
                                Tags
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {post.tags.map((tag, idx) => (
                                    <motion.span
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.7 + idx * 0.05 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="px-4 py-2 bg-[var(--gray-100)] dark:bg-[var(--gray-800)] text-[var(--color-foreground)] rounded-full font-medium hover:bg-[var(--color-button-bg)] hover:text-white transition-all cursor-pointer"
                                    >
                                        #{tag}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Share Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-12 p-8 bg-gradient-to-r from-[var(--color-button-bg)]/5 to-purple-500/5 rounded-2xl border border-[var(--color-border)]"
                    >
                        <p className="text-lg font-medium text-[var(--color-foreground)] mb-4">
                            ¿Te gustó este artículo? ¡Compártelo!
                        </p>
                        <div className="flex gap-4">
                            <button className="px-6 py-3 bg-[#1DA1F2] text-white rounded-lg font-medium hover:bg-[#1a8cd8] transition-colors flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                                Twitter
                            </button>
                            <button className="px-6 py-3 bg-[#0A66C2] text-white rounded-lg font-medium hover:bg-[#004182] transition-colors flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                LinkedIn
                            </button>
                        </div>
                    </motion.div>
                </div>
            </article>

            {/* Related Posts with Card Grid */}
            {relatedPosts.length > 0 && (
                <section className="py-20 bg-gradient-to-b from-transparent to-[var(--gray-50)] dark:to-[var(--gray-900)]">
                    <div className="max-w-7xl mx-auto px-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-bold mb-12 text-[var(--color-foreground)]"
                        >
                            Sigue Leyendo
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost, idx) => (
                                <motion.div
                                    key={relatedPost.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <Link href={`/blog/${relatedPost.slug}`}>
                                        <motion.div
                                            whileHover={{ y: -8, scale: 1.02 }}
                                            className="group relative bg-[var(--color-background)] rounded-2xl overflow-hidden border-2 border-[var(--color-border)] hover:border-[var(--color-button-bg)] transition-all h-full"
                                        >
                                            {/* Glow Effect on Hover */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-button-bg)]/0 to-purple-500/0 group-hover:from-[var(--color-button-bg)]/10 group-hover:to-purple-500/10 transition-all duration-300" />

                                            <div className="relative p-6">
                                                {relatedPost.category && (
                                                    <span className="inline-block px-3 py-1 bg-[var(--color-button-bg)]/10 text-[var(--color-button-bg)] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                                                        {relatedPost.category}
                                                    </span>
                                                )}

                                                <h3 className="text-xl font-bold mb-3 text-[var(--color-foreground)] group-hover:text-[var(--color-button-bg)] transition-colors line-clamp-2">
                                                    {relatedPost.title}
                                                </h3>

                                                {relatedPost.excerpt && (
                                                    <p className="text-[var(--color-primary)] text-sm line-clamp-3 mb-4">
                                                        {relatedPost.excerpt}
                                                    </p>
                                                )}

                                                <div className="flex items-center gap-2 text-xs text-[var(--color-primary)]">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {calculateReadingTime(relatedPost.content)} min
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}
