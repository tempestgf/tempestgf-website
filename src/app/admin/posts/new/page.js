"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import RichTextEditor from '@/components/RichTextEditor';
import ImageUpload from '@/components/ImageUpload';
import { generateSlug } from '@/lib/blogUtils';

export default function NewPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        featuredImage: '',
        category: '',
        tags: '',
        status: 'draft',
        author: 'Admin',
        seoTitle: '',
        seoDescription: '',
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Auto-generate slug from title
        if (field === 'title' && !formData.slug) {
            setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('adminToken');

        // Process tags
        const tagsArray = formData.tags
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);

        const postData = {
            ...formData,
            tags: tagsArray,
        };

        try {
            const response = await fetch('/api/blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(postData),
            });

            const data = await response.json();

            if (data.success) {
                alert('Post creado exitosamente!');
                router.push('/admin/posts');
            } else {
                alert(data.error || 'Error al crear el post');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Error al crear el post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-[var(--color-foreground)] mb-2">
                    Crear Nuevo Post
                </h1>
                <p className="text-[var(--color-primary)]">
                    Escribe y publica contenido increíble
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Editor Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                                Título *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                className="w-full px-4 py-3 bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-xl focus:border-[var(--color-button-bg)] focus:outline-none transition-colors text-[var(--color-foreground)] text-xl font-bold"
                                placeholder="Título impactante..."
                                required
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                                Slug (URL) *
                            </label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => handleChange('slug', e.target.value)}
                                className="w-full px-4 py-3 bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-xl focus:border-[var(--color-button-bg)] focus:outline-none transition-colors text-[var(--color-foreground)]"
                                placeholder="mi-post-increible"
                                required
                            />
                            <p className="text-xs text-[var(--color-primary)] mt-1">
                                URL: /blog/{formData.slug || 'mi-post-increible'}
                            </p>
                        </div>

                        {/* Editor */}
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                                Contenido *
                            </label>
                            <RichTextEditor
                                value={formData.content}
                                onChange={(value) => handleChange('content', value)}
                                placeholder="Escribe tu contenido aquí..."
                            />
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                                Extracto
                            </label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => handleChange('excerpt', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-xl focus:border-[var(--color-button-bg)] focus:outline-none transition-colors text-[var(--color-foreground)]"
                                placeholder="Breve resumen del post..."
                            />
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-6">
                        {/* Publish Box */}
                        <div className="bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-xl p-6 sticky top-8">
                            <h3 className="font-bold text-lg text-[var(--color-foreground)] mb-4">
                                Publicación
                            </h3>

                            {/* Status */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                                    Estado
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => handleChange('status', e.target.value)}
                                    className="w-full px-4 py-3 bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-xl focus:border-[var(--color-button-bg)] focus:outline-none transition-colors text-[var(--color-foreground)]"
                                >
                                    <option value="draft">Borrador</option>
                                    <option value="published">Publicado</option>
                                </select>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-[var(--color-button-bg)] text-white rounded-xl font-semibold hover:bg-[var(--color-button-bg-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Guardando...' : formData.status === 'draft' ? 'Guardar Borrador' : 'Publicar'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setShowPreview(!showPreview)}
                                    className="w-full py-3 bg-[var(--gray-100)] dark:bg-[var(--gray-800)] text-[var(--color-foreground)] rounded-xl font-semibold hover:bg-[var(--gray-200)] dark:hover:bg-[var(--gray-700)] transition-colors"
                                >
                                    {showPreview ? 'Ocultar Vista Previa' : 'Vista Previa'}
                                </button>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-xl p-6">
                            <h3 className="font-bold text-lg text-[var(--color-foreground)] mb-4">
                                Imagen Destacada
                            </h3>
                            <ImageUpload
                                currentImage={formData.featuredImage}
                                onImageUpload={(url) => handleChange('featuredImage', url)}
                            />
                        </div>

                        {/* Category */}
                        <div className="bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-xl p-6">
                            <h3 className="font-bold text-lg text-[var(--color-foreground)] mb-4">
                                Categoría
                            </h3>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => handleChange('category', e.target.value)}
                                className="w-full px-4 py-3 bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-xl focus:border-[var(--color-button-bg)] focus:outline-none transition-colors text-[var(--color-foreground)]"
                                placeholder="Tecnología, IA, Web..."
                            />
                        </div>

                        {/* Tags */}
                        <div className="bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-xl p-6">
                            <h3 className="font-bold text-lg text-[var(--color-foreground)] mb-4">
                                Etiquetas
                            </h3>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => handleChange('tags', e.target.value)}
                                className="w-full px-4 py-3 bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-xl focus:border-[var(--color-button-bg)] focus:outline-none transition-colors text-[var(--color-foreground)]"
                                placeholder="tag1, tag2, tag3"
                            />
                            <p className="text-xs text-[var(--color-primary)] mt-2">
                                Separadas por comas
                            </p>
                        </div>

                        {/* SEO */}
                        <div className="bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-xl p-6">
                            <h3 className="font-bold text-lg text-[var(--color-foreground)] mb-4">
                                SEO
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                                        Meta Título
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.seoTitle}
                                        onChange={(e) => handleChange('seoTitle', e.target.value)}
                                        className="w-full px-4 py-2 bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-xl focus:border-[var(--color-button-bg)] focus:outline-none transition-colors text-[var(--color-foreground)] text-sm"
                                        placeholder="Título para buscadores..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--color-foreground)] mb-2">
                                        Meta Descripción
                                    </label>
                                    <textarea
                                        value={formData.seoDescription}
                                        onChange={(e) => handleChange('seoDescription', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-2 bg-[var(--color-background)] border-2 border-[var(--color-border)] rounded-xl focus:border-[var(--color-button-bg)] focus:outline-none transition-colors text-[var(--color-foreground)] text-sm"
                                        placeholder="Descripción para buscadores..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* Preview Modal */}
            <AnimatePresence>
                {showPreview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowPreview(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[var(--color-background)] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
                        >
                            <div className="sticky top-0 bg-[var(--color-background)] border-b border-[var(--color-border)] p-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-[var(--color-foreground)]">
                                    Vista Previa
                                </h2>
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="p-2 hover:bg-[var(--gray-100)] dark:hover:bg-[var(--gray-800)] rounded-lg transition-colors"
                                >
                                    <svg className="w-6 h-6 text-[var(--color-foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="p-8">
                                {formData.featuredImage && (
                                    <img
                                        src={formData.featuredImage}
                                        alt={formData.title}
                                        className="w-full h-64 object-cover rounded-xl mb-8"
                                    />
                                )}

                                <h1 className="text-5xl font-bold text-[var(--color-foreground)] mb-4">
                                    {formData.title || 'Título del post'}
                                </h1>

                                {formData.excerpt && (
                                    <p className="text-xl text-[var(--color-primary)] mb-8 font-medium">
                                        {formData.excerpt}
                                    </p>
                                )}

                                <div
                                    className="blog-content"
                                    dangerouslySetInnerHTML={{ __html: formData.content || '<p>El contenido aparecerá aquí...</p>' }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
