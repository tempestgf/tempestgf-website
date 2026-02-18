"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageUpload({ onImageUpload, currentImage = null }) {
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState(currentImage);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFileInput = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFile = async (file) => {
        setError(null);

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB');
            return;
        }

        setUploading(true);

        try {
            // Upload to server
            const formData = new FormData();
            formData.append('file', file);

            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setPreview(data.url);
                onImageUpload(data.url);
            } else {
                setError(data.error || 'Upload failed');
            }
        } catch (err) {
            console.error('Upload error:', err);
            setError('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onImageUpload(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {preview ? (
                    <motion.div
                        key="preview"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative group"
                    >
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-64 object-cover rounded-xl border-2 border-[var(--color-border)]"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                            <button
                                onClick={handleRemove}
                                className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                            >
                                Eliminar imagen
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`
              relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
              transition-all duration-300
              ${isDragging
                                ? 'border-[var(--color-button-bg)] bg-[var(--color-button-bg)]/5 scale-105'
                                : 'border-[var(--color-border)] hover:border-[var(--color-button-bg)]/50'
                            }
            `}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileInput}
                            className="hidden"
                        />

                        {uploading ? (
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 border-4 border-[var(--color-button-bg)] border-t-transparent rounded-full animate-spin mb-4" />
                                <p className="text-[var(--color-primary)]">Subiendo imagen...</p>
                            </div>
                        ) : (
                            <>
                                <svg
                                    className="w-16 h-16 mx-auto mb-4 text-[var(--color-primary)]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                                <p className="text-lg font-semibold text-[var(--color-foreground)] mb-2">
                                    Arrastra una imagen aquí
                                </p>
                                <p className="text-sm text-[var(--color-primary)]">
                                    o haz clic para seleccionar
                                </p>
                                <p className="text-xs text-[var(--color-primary)] mt-2">
                                    Máximo 5MB • JPG, PNG, GIF, WebP
                                </p>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-500"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
}
