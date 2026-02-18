"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('adminToken');

        if (!token) {
            if (pathname !== '/admin/login') {
                router.push('/admin/login');
            } else {
                setLoading(false);
            }
            return;
        }

        try {
            const response = await fetch('/api/admin/auth', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (data.success) {
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem('adminToken');
                router.push('/admin/login');
            }
        } catch (error) {
            console.error('Auth check error:', error);
            localStorage.removeItem('adminToken');
            router.push('/admin/login');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
    };

    // Don't show layout on login page
    if (pathname === '/admin/login') {
        return children;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[var(--color-button-bg)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: '📊' },
        { name: 'Posts', href: '/admin/posts', icon: '📝' },
        { name: 'Nuevo Post', href: '/admin/posts/new', icon: '➕' },
    ];

    return (
        <div className="min-h-screen bg-[var(--gray-50)] dark:bg-[var(--gray-900)] flex">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: sidebarOpen ? 280 : 80 }}
                className="bg-[var(--color-background)] border-r border-[var(--color-border)] fixed h-screen z-50 overflow-hidden"
            >
                <div className="p-6">
                    {/* Logo/Toggle */}
                    <div className="flex items-center justify-between mb-8">
                        {sidebarOpen && (
                            <h2 className="text-xl font-bold text-[var(--color-foreground)]">
                                Admin Panel
                            </h2>
                        )}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-[var(--gray-100)] dark:hover:bg-[var(--gray-800)] rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6 text-[var(--color-foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive
                                            ? 'bg-[var(--color-button-bg)] text-white shadow-lg'
                                            : 'text-[var(--color-foreground)] hover:bg-[var(--gray-100)] dark:hover:bg-[var(--gray-800)]'
                                        }
                  `}
                                >
                                    <span className="text-2xl">{item.icon}</span>
                                    {sidebarOpen && (
                                        <span className="font-semibold">{item.name}</span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Button */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-foreground)] hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all duration-200"
                        >
                            <span className="text-2xl">🚪</span>
                            {sidebarOpen && <span className="font-semibold">Salir</span>}
                        </button>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <motion.div
                animate={{ marginLeft: sidebarOpen ? '280px' : '80px' }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex-1"
            >
                {/* Top Bar */}
                <header className="bg-[var(--color-background)] border-b border-[var(--color-border)] px-8 py-4 sticky top-0 z-40">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-[var(--color-foreground)]">
                            Panel de Administración
                        </h1>
                        <Link
                            href="/blog"
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 bg-[var(--gray-100)] dark:bg-[var(--gray-800)] text-[var(--color-foreground)] rounded-lg hover:bg-[var(--gray-200)] dark:hover:bg-[var(--gray-700)] transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Ver Blog
                        </Link>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8">
                    {children}
                </main>
            </motion.div>
        </div>
    );
}
