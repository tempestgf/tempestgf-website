"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem('adminToken');

        try {
            // Fetch stats
            const statsRes = await fetch('/api/admin/auth', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const statsData = await statsRes.json();

            if (statsData.success) {
                setStats(statsData.stats);
            }

            // Fetch recent posts
            const postsRes = await fetch('/api/blog?all=true', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const postsData = await postsRes.json();

            if (postsData.success) {
                setRecentPosts(postsData.posts.slice(0, 5));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-16 h-16 border-4 border-[var(--color-button-bg)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const statCards = [
        {
            title: 'Total Posts',
            value: stats?.total || 0,
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
            ),
            gradient: 'from-blue-500 to-blue-600',
            shadow: 'shadow-blue-500/30',
        },
        {
            title: 'Publicados',
            value: stats?.published || 0,
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            gradient: 'from-green-500 to-green-600',
            shadow: 'shadow-green-500/30',
        },
        {
            title: 'Borradores',
            value: stats?.drafts || 0,
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
            gradient: 'from-orange-500 to-orange-600',
            shadow: 'shadow-orange-500/30',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-2">
                    Dashboard
                </h1>
                <p className="text-[var(--color-primary)] text-lg">
                    Bienvenido de nuevo al panel de control
                </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {statCards.map((stat, idx) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className={`relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${stat.gradient} ${stat.shadow} shadow-xl`}
                    >
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-black/10 rounded-full blur-2xl" />

                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <p className="text-white/80 font-medium mb-2">{stat.title}</p>
                                <h3 className="text-5xl font-bold text-white">{stat.value}</h3>
                            </div>
                            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                                {stat.icon}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions & Recent Posts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Quick Actions Column */}
                <div className="lg:col-span-1 space-y-6">
                    <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Acciones</h2>

                    <Link href="/admin/posts/new">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative overflow-hidden bg-[var(--color-button-bg)] text-white rounded-3xl p-8 shadow-xl cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Nuevo Post</h3>
                                <p className="text-white/80">Crea y publica un nuevo artículo para tu blog</p>
                            </div>
                        </motion.div>
                    </Link>

                    <Link href="/admin/posts">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-3xl p-8 hover:border-[var(--color-button-bg)] transition-all cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-[var(--gray-100)] dark:bg-[var(--gray-800)] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[var(--color-button-bg)] group-hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2">Gestionar Posts</h3>
                            <p className="text-[var(--color-primary)]">Edita o elimina tus artículos existentes</p>
                        </motion.div>
                    </Link>
                </div>

                {/* Recent Posts Column */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-[var(--color-foreground)]">
                            Recientes
                        </h2>
                        <Link
                            href="/admin/posts"
                            className="text-[var(--color-button-bg)] font-semibold hover:underline flex items-center gap-1"
                        >
                            Ver todo
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {recentPosts.length > 0 ? (
                            recentPosts.map((post, idx) => (
                                <Link key={post.id} href={`/admin/posts/edit/${post.id}`}>
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        whileHover={{ scale: 1.01, x: 4 }}
                                        className="group bg-[var(--color-background)] border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-button-bg)] hover:shadow-lg transition-all"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 min-w-0 mr-4">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-bold text-lg text-[var(--color-foreground)] truncate group-hover:text-[var(--color-button-bg)] transition-colors">
                                                        {post.title}
                                                    </h3>
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${post.status === 'published'
                                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                            }`}
                                                    >
                                                        {post.status === 'published' ? 'Publicado' : 'Borrador'}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-[var(--color-primary)]">
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        {new Date(post.createdAt).toLocaleDateString('es-ES', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                        </svg>
                                                        {post.category || 'Sin categoría'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-[var(--gray-100)] dark:bg-[var(--gray-800)] flex items-center justify-center group-hover:bg-[var(--color-button-bg)] group-hover:text-white transition-all">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-[var(--gray-50)] dark:bg-[var(--gray-900)] rounded-3xl border-2 border-dashed border-[var(--color-border)]">
                                <div className="w-16 h-16 mx-auto bg-[var(--gray-200)] dark:bg-[var(--gray-800)] rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <p className="text-[var(--color-primary)] mb-4">No hay posts todavía</p>
                                <Link
                                    href="/admin/posts/new"
                                    className="inline-block px-6 py-2 bg-[var(--color-button-bg)] text-white rounded-lg font-semibold hover:bg-[var(--color-button-bg-hover)] transition-colors"
                                >
                                    Crear tu primer post
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
