"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import Footer from '@/components/Footer';
import { searchPosts, filterByCategory, getCategories } from '@/lib/blogUtils';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    fetchPosts();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();

      if (data.success) {
        setPosts(data.posts);
        setCategories(['all', ...getCategories(data.posts)]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and search posts
  const filteredPosts = searchPosts(
    filterByCategory(posts, selectedCategory),
    searchQuery
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-button-bg)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--color-primary)] text-lg">Cargando blog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Simple Blog Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[var(--color-background)]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-2xl font-bold text-[var(--color-foreground)] group-hover:text-[var(--color-button-bg)] transition-colors">
              Tempestgf
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/" className="text-[var(--color-foreground)] hover:text-[var(--color-button-bg)] transition-colors font-medium">
              Inicio
            </Link>
            <Link href="/blog" className="text-[var(--color-button-bg)] font-medium">
              Blog
            </Link>
            <Link href="/#contact" className="px-4 py-2 bg-[var(--color-button-bg)] text-white rounded-lg hover:bg-[var(--color-button-bg-hover)] transition-colors font-medium">
              Contacto
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section with Gradient */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-button-bg)]/5 via-transparent to-purple-500/5" />

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-[var(--color-button-bg)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="blog-title mb-6">
              Insights & Thoughts
            </h1>
            <p className="text-xl md:text-2xl text-[var(--color-primary)] max-w-3xl mx-auto font-light leading-relaxed">
              Explorando tecnología, desarrollo web, inteligencia artificial y ciberseguridad
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[var(--gray-50)] dark:bg-[var(--gray-900)] p-6 rounded-2xl border border-[var(--color-border)]"
        >
          {/* Search Bar */}
          <div className="relative flex-1 w-full">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-primary)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[var(--gray-800)] border-2 border-[var(--color-border)] rounded-xl focus:border-[var(--color-button-bg)] focus:outline-none transition-colors text-[var(--color-foreground)]"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${selectedCategory === category
                    ? 'bg-[var(--color-button-bg)] text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-[var(--gray-800)] text-[var(--color-foreground)] hover:bg-[var(--gray-100)] dark:hover:bg-[var(--gray-700)] border border-[var(--color-border)]'
                  }`}
              >
                {category === 'all' ? 'Todos' : category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[var(--color-primary)] mt-6 text-sm"
        >
          {filteredPosts.length} {filteredPosts.length === 1 ? 'artículo' : 'artículos'}
          {searchQuery && ` que coinciden con "${searchQuery}"`}
        </motion.p>
      </section>

      {/* Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <AnimatePresence mode="wait">
          {filteredPosts.length > 0 ? (
            <motion.div
              key="posts-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-posts"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-[var(--gray-100)] dark:bg-[var(--gray-800)] rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-3">
                  No se encontraron artículos
                </h3>
                <p className="text-[var(--color-primary)] mb-6">
                  {searchQuery
                    ? `No hay artículos que coincidan con "${searchQuery}"`
                    : selectedCategory !== 'all'
                      ? `No hay artículos en la categoría "${selectedCategory}"`
                      : 'Próximamente nuevos artículos'}
                </p>
                {(searchQuery || selectedCategory !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-6 py-3 bg-[var(--color-button-bg)] text-white rounded-xl font-semibold hover:bg-[var(--color-button-bg-hover)] transition-colors"
                  >
                    Ver todos los artículos
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  );
}
