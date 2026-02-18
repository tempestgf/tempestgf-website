"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function AdminPostsPage() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const token = localStorage.getItem('adminToken');

        try {
            const response = await fetch('/api/blog?all=true', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();

            if (data.success) {
                setPosts(data.posts);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, title) => {
        if (!confirm(`¿Estás seguro de que quieres eliminar "${title}"?`)) {
            return;
        }

        const token = localStorage.getItem('adminToken');

        try {
            const response = await fetch(`/api/blog/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            const data = await response.json();

            if (data.success) {
                setPosts(posts.filter(p => p.id !== id));
            } else {
                alert('Error al eliminar el post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Error al eliminar el post');
        }
    };

    // Filter posts
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-16 h-16 border-4 border-[var(--color-button-bg)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-2">
                        Gestión de Posts
                    </h1>
                    <p className="text-[var(--color-primary)]">
                        Administra, edita y publica tus artículos
                    </p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="group px-6 py-3 bg-[var(--color-button-bg)] text-white rounded-xl font-semibold hover:bg-[var(--color-button-bg-hover)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Nuevo Post
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-[var(--color-background)] p-6 rounded-2xl border border-[var(--color-border)] shadow-sm mb-8">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 relative">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Buscar por título o contenido..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-[var(--gray-50)] dark:bg-[var(--gray-900)] border border-[var(--color-border)] rounded-xl focus:border-[var(--color-button-bg)] focus:ring-2 focus:ring-[var(--color-button-bg)]/20 focus:outline-none transition-all text-[var(--color-foreground)]"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        {['all', 'published', 'draft'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${statusFilter === status
                                    ? 'bg-[var(--color-button-bg)] text-white shadow-md scale-105'
                                    : 'bg-[var(--gray-100)] dark:bg-[var(--gray-800)] text-[var(--color-foreground)] hover:bg-[var(--gray-200)] dark:hover:bg-[var(--gray-700)]'
                                    }`}
                            >
                                {status === 'all' ? 'Todos' : status === 'published' ? 'Publicados' : 'Borradores'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Stats */}
            <div className="flex items-center justify-between mb-6 px-2">
                <p className="text-[var(--color-primary)] font-medium">
                    Mostrando {filteredPosts.length} {filteredPosts.length === 1 ? 'resultado' : 'resultados'}
                </p>
            </div>

            {/* Posts List */}
            <AnimatePresence mode="wait">
                {filteredPosts.length > 0 ? (
                    <div className="space-y-4">
                        {filteredPosts.map((post, idx) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-button-bg)] hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${post.status === 'published'
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                    }`}
                                            >
                                                {post.status === 'published' ? 'Publicado' : 'Borrador'}
                                            </span>
                                            <span className="text-sm text-[var(--color-primary)] flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {new Date(post.createdAt).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2 group-hover:text-[var(--color-button-bg)] transition-colors">
                                            {post.title}
                                        </h3>

                                        {post.excerpt && (
                                            <p className="text-[var(--color-primary)] mb-4 line-clamp-2 max-w-3xl">
                                                {post.excerpt}
                                            </p>
                                        )}

                                        <div className="flex flex-wrap items-center gap-3">
                                            {post.category && (
                                                <span className="px-3 py-1 bg-[var(--gray-100)] dark:bg-[var(--gray-800)] text-[var(--color-foreground)] rounded-lg text-sm font-medium">
                                                    {post.category}
                                                </span>
                                            )}
                                            {post.tags && post.tags.slice(0, 3).map((tag, i) => (
                                                <span key={i} className="text-sm text-[var(--color-primary)]">#{tag}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-[var(--color-border)]">
                                        <Link href={`/admin/posts/edit/${post.id}`}>
                                            <button className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors" title="Editar">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        </Link>

                                        {post.status === 'published' && (
                                            <Link href={`/blog/${post.slug}`} target="_blank">
                                                <button className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors" title="Ver en vivo">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                            </Link>
                                        )}

                                        <button
                                            onClick={() => handleDelete(post.id, post.title)}
                                            className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                                            title="Eliminar"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20 bg-[var(--color-background)] border-2 border-dashed border-[var(--color-border)] rounded-3xl"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 bg-[var(--gray-100)] dark:bg-[var(--gray-800)] rounded-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-2">
                            No se encontraron posts
                        </h3>
                        <p className="text-[var(--color-primary)] mb-8 max-w-md mx-auto">
                            {searchQuery || statusFilter !== 'all'
                                ? `No hay resultados para "${searchQuery}" con el filtro seleccionado.`
                                : 'Aún no has escrito ningún artículo. ¡Es hora de empezar!'}
                        </p>
                        <Link
                            href="/admin/posts/new"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-button-bg)] text-white rounded-xl font-semibold hover:bg-[var(--color-button-bg-hover)] transition-colors shadow-lg hover:shadow-xl"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Crear Nuevo Post
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
