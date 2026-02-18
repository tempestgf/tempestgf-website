"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaTwitter, FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { useTranslation } from '../hooks/useTranslation';

export default function ContactSection() {
    const { t } = useTranslation();
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState({
        submitted: false,
        success: false,
        message: ''
    });

    // Configuración de redes sociales
    const SOCIAL_LINKS = [
        { href: 'https://twitter.com/tempestgf', icon: FaTwitter, label: 'Twitter', color: 'hover:text-blue-400', hoverGlow: '#1DA1F2' },
        { href: 'https://github.com/tempestgf', icon: FaGithub, label: 'GitHub', color: 'hover:text-purple-400', hoverGlow: '#6e5494' },
        { href: 'https://linkedin.com/in/tempestgf', icon: FaLinkedin, label: 'LinkedIn', color: 'hover:text-blue-500', hoverGlow: '#0A66C2' },
        { href: 'https://discord.com/users/tempestgf', icon: FaDiscord, label: 'Discord', color: 'hover:text-indigo-400', hoverGlow: '#5865F2' },
    ];

    const [activeField, setActiveField] = useState(null);
    const [sending, setSending] = useState(false);
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: false,
        threshold: 0.2
    });

    // Added state for particles to avoid hydration errors
    const [particles, setParticles] = useState([]);

    // Create particles only on client side
    useEffect(() => {
        // Generate deterministic particles
        const particleCount = 12;
        const generatedParticles = Array.from({ length: particleCount }).map((_, i) => {
            // Use seeded pseudo-random values
            return {
                width: 100 + ((i * 53) % 150),
                height: 100 + ((i * 37) % 150),
                left: ((i * 17) % 100),
                top: ((i * 23) % 100),
                animX: ((i * 11) % 40) - 20,
                animY: ((i * 13) % 40) - 20,
                duration: 5 + (i % 10),
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
            };
        });

        setParticles(generatedParticles);
    }, []);

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);

        try {
            // Enviar los datos del formulario a nuestra API
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            });

            const data = await response.json();

            if (data.success) {
                setFormStatus({
                    submitted: true,
                    success: true,
                    message: t('contact.form.successMessage')
                });
            } else {
                throw new Error(data.message || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setFormStatus({
                submitted: true,
                success: false,
                message: t('contact.form.errorMessage')
            });
        } finally {
            setSending(false);
        }
    };

    const handleReset = () => {
        setFormState({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        setFormStatus({
            submitted: false,
            success: false,
            message: ''
        });
    };

    return (
        <section
            id="contact"
            ref={ref}
            className="relative py-24 px-4 bg-[var(--color-background)] overflow-hidden"
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Particles - only render on client side */}
                {particles.map((particle, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-[var(--color-button-bg)]/10"
                        style={{
                            width: `${particle.width}px`,
                            height: `${particle.height}px`,
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                        }}
                        animate={{
                            scale: particle.scale,
                            x: [0, particle.animX],
                            y: [0, particle.animY],
                            opacity: particle.opacity,
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Grid lines */}
                <motion.div
                    className="absolute inset-0"
                    animate={{ opacity: [0.05, 0.1, 0.05] }}
                    transition={{ duration: 5, repeat: Infinity }}
                >
                    <svg width="100%" height="100%" className="absolute inset-0">
                        <pattern id="contact-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="40" height="40" fill="none" stroke="var(--color-button-bg)" strokeWidth="0.5" strokeOpacity="0.1" />
                        </pattern>
                        <rect x="0" y="0" width="100%" height="100%" fill="url(#contact-grid)" />
                    </svg>
                </motion.div>

                {/* Cyber decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-button-bg)] to-transparent opacity-70"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 border-r-2 border-b-2 border-[var(--color-button-bg)] opacity-10"></div>
                <div className="absolute top-40 left-10 w-20 h-20 border-t-2 border-l-2 border-[var(--color-button-bg)] opacity-10"></div>
            </div>

            <div className="relative z-10 container-responsive max-w-screen-xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                    }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block" dangerouslySetInnerHTML={{ __html: t('contact.title') }} />

                    <motion.p
                        className="max-w-2xl mx-auto text-[var(--color-primary)] text-lg"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8 } }
                        }}
                    >
                        {t('contact.subtitle')}
                    </motion.p>
                </motion.div>

                {/* Contact Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Contact Info */}
                    <motion.div
                        className="lg:col-span-2 space-y-8"
                        variants={{
                            hidden: { opacity: 0, x: -50 },
                            visible: { opacity: 1, x: 0, transition: { delay: 0.4, duration: 0.8 } }
                        }}
                        initial="hidden"
                        animate={controls}
                    >
                        {/* Email Info Card */}
                        <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-6 relative overflow-hidden group hover:border-[var(--color-button-bg)]/50 transition-colors duration-300">
                            {/* Card glow effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-button-bg)]/0 to-[var(--color-button-bg)]/0 opacity-0 group-hover:opacity-100 group-hover:from-[var(--color-button-bg)]/10 group-hover:to-transparent rounded-xl blur transition-all duration-700"></div>

                            <h3 className="text-xl font-bold mb-4 flex items-center text-[var(--color-foreground)]">
                                <div className="w-8 h-8 mr-3 rounded-full bg-[var(--color-button-bg)]/10 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--color-button-bg)]" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                {t('contact.email')}
                            </h3>
                            <p className="text-[var(--color-primary)] ml-11">tempestgf@protonmail.com</p>
                        </div>

                        {/* Location Info Card */}
                        <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-6 relative overflow-hidden group hover:border-[var(--color-button-bg)]/50 transition-colors duration-300">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-button-bg)]/0 to-[var(--color-button-bg)]/0 opacity-0 group-hover:opacity-100 group-hover:from-[var(--color-button-bg)]/10 group-hover:to-transparent rounded-xl blur transition-all duration-700"></div>

                            <h3 className="text-xl font-bold mb-4 flex items-center text-[var(--color-foreground)]">
                                <div className="w-8 h-8 mr-3 rounded-full bg-[var(--color-button-bg)]/10 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--color-button-bg)]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                {t('contact.location')}
                            </h3>
                            <p className="text-[var(--color-primary)] ml-11">Barcelona, Spain</p>
                        </div>

                        {/* Social Media Info Card */}
                        <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-6 relative overflow-hidden group hover:border-[var(--color-button-bg)]/50 transition-colors duration-300">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--color-button-bg)]/0 to-[var(--color-button-bg)]/0 opacity-0 group-hover:opacity-100 group-hover:from-[var(--color-button-bg)]/10 group-hover:to-transparent rounded-xl blur transition-all duration-700"></div>

                            <h3 className="text-xl font-bold mb-4 flex items-center text-[var(--color-foreground)]">
                                <div className="w-8 h-8 mr-3 rounded-full bg-[var(--color-button-bg)]/10 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--color-button-bg)]" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                    </svg>
                                </div>
                                {t('contact.socialMedia')}
                            </h3>

                            {/* Redes sociales mejoradas */}
                            <div className="flex space-x-3 ml-11">
                                {SOCIAL_LINKS.map(({ href, icon: Icon, label, color, hoverGlow }) => (
                                    <motion.a
                                        key={href}
                                        href={href}
                                        aria-label={label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--color-background)] text-[var(--color-foreground)] ${color} transition-all duration-300 relative group/icon overflow-hidden backdrop-blur-sm border border-[var(--color-border)]`}
                                        whileHover={{
                                            y: -3,
                                            boxShadow: `0 5px 15px -5px ${hoverGlow}80`
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {/* Background highlight effect on hover */}
                                        <motion.div
                                            className="absolute inset-0 opacity-0 group-hover/icon:opacity-20"
                                            style={{ backgroundColor: hoverGlow }}
                                            transition={{ duration: 0.3 }}
                                        />

                                        {/* Icon */}
                                        <Icon className="w-4 h-4 relative z-10 group-hover/icon:scale-110 transition-transform duration-300" />

                                        {/* Border glow effect */}
                                        <motion.div
                                            className="absolute inset-0 opacity-0 group-hover/icon:opacity-100 border-2 rounded-lg"
                                            style={{ borderColor: hoverGlow }}
                                            initial={{ opacity: 0 }}
                                            whileHover={{
                                                opacity: 1,
                                                boxShadow: `0 0 10px ${hoverGlow}50`
                                            }}
                                        />

                                        {/* Circle ping effect on hover */}
                                        <motion.div
                                            className="absolute inset-0 rounded-lg opacity-0 group-hover/icon:opacity-100"
                                            initial={{ scale: 0 }}
                                            whileHover={{
                                                scale: [0, 1.2],
                                                opacity: [0.7, 0],
                                                transition: { duration: 1, repeat: Infinity }
                                            }}
                                            style={{ border: `2px solid ${hoverGlow}` }}
                                        />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="lg:col-span-3"
                        variants={{
                            hidden: { opacity: 0, x: 50 },
                            visible: { opacity: 1, x: 0, transition: { delay: 0.5, duration: 0.8 } }
                        }}
                        initial="hidden"
                        animate={controls}
                    >
                        <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-8 relative">
                            {/* Decorative corner elements */}
                            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[var(--color-button-bg)]/40 opacity-70"></div>
                            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[var(--color-button-bg)]/40 opacity-70"></div>

                            {formStatus.submitted ? (
                                <motion.div
                                    className={`text-center py-12 px-6 ${formStatus.success ? 'text-green-500' : 'text-red-500'}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <motion.div
                                        className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                                        style={{
                                            backgroundColor: formStatus.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            border: `2px solid ${formStatus.success ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)'}`
                                        }}
                                    >
                                        <svg
                                            className="w-10 h-10"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            {formStatus.success ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            ) : (
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            )}
                                        </svg>
                                    </motion.div>

                                    <motion.h3
                                        className="text-2xl font-bold mb-4"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {formStatus.success ? t('contact.form.success') : t('contact.form.error')}
                                    </motion.h3>

                                    <motion.p
                                        className="mb-8 text-[var(--color-primary)]"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        {formStatus.success ? t('contact.form.successMessage') : t('contact.form.errorMessage')}
                                    </motion.p>

                                    <motion.button
                                        onClick={handleReset}
                                        className="px-6 py-2 rounded-lg border text-[var(--color-button-bg)] border-[var(--color-button-bg)] hover:bg-[var(--color-button-bg)] hover:text-white transition-all duration-300"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        {t('contact.form.sendAnother')}
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {/* Name field */}
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formState.name}
                                                onChange={handleChange}
                                                onFocus={() => setActiveField('name')}
                                                onBlur={() => setActiveField(null)}
                                                required
                                                placeholder=" "
                                                className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] placeholder-[var(--color-primary)]/50 focus:outline-none focus:border-[var(--color-button-bg)] focus:ring-1 focus:ring-[var(--color-button-bg)] transition-colors peer"
                                            />
                                            <label
                                                htmlFor="name"
                                                className={`absolute text-sm text-[var(--color-primary)] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[var(--color-background)] px-2 peer-focus:px-2 peer-focus:text-[var(--color-button-bg)] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3`}
                                            >
                                                {t('contact.form.name')}
                                            </label>
                                            {activeField === 'name' && (
                                                <motion.div
                                                    layoutId="active-input"
                                                    className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-button-bg)]"
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    exit={{ scaleX: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            )}
                                        </div>

                                        {/* Email field */}
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formState.email}
                                                onChange={handleChange}
                                                onFocus={() => setActiveField('email')}
                                                onBlur={() => setActiveField(null)}
                                                required
                                                placeholder=" "
                                                className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] placeholder-[var(--color-primary)]/50 focus:outline-none focus:border-[var(--color-button-bg)] focus:ring-1 focus:ring-[var(--color-button-bg)] transition-colors peer"
                                            />
                                            <label
                                                htmlFor="email"
                                                className={`absolute text-sm text-[var(--color-primary)] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[var(--color-background)] px-2 peer-focus:px-2 peer-focus:text-[var(--color-button-bg)] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3`}
                                            >
                                                {t('contact.form.email')}
                                            </label>
                                            {activeField === 'email' && (
                                                <motion.div
                                                    layoutId="active-input"
                                                    className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-button-bg)]"
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    exit={{ scaleX: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            )}
                                        </div>

                                        {/* Subject field */}
                                        <div className="relative sm:col-span-2">
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formState.subject}
                                                onChange={handleChange}
                                                onFocus={() => setActiveField('subject')}
                                                onBlur={() => setActiveField(null)}
                                                required
                                                placeholder=" "
                                                className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] placeholder-[var(--color-primary)]/50 focus:outline-none focus:border-[var(--color-button-bg)] focus:ring-1 focus:ring-[var(--color-button-bg)] transition-colors peer"
                                            />
                                            <label
                                                htmlFor="subject"
                                                className={`absolute text-sm text-[var(--color-primary)] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[var(--color-background)] px-2 peer-focus:px-2 peer-focus:text-[var(--color-button-bg)] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3`}
                                            >
                                                {t('contact.form.subject')}
                                            </label>
                                            {activeField === 'subject' && (
                                                <motion.div
                                                    layoutId="active-input"
                                                    className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-button-bg)]"
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    exit={{ scaleX: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            )}
                                        </div>

                                        {/* Message field */}
                                        <div className="relative sm:col-span-2">
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formState.message}
                                                onChange={handleChange}
                                                onFocus={() => setActiveField('message')}
                                                onBlur={() => setActiveField(null)}
                                                required
                                                rows={6}
                                                placeholder=" "
                                                className="w-full px-4 py-3 bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg text-[var(--color-foreground)] placeholder-[var(--color-primary)]/50 focus:outline-none focus:border-[var(--color-button-bg)] focus:ring-1 focus:ring-[var(--color-button-bg)] transition-colors peer"
                                            />
                                            <label
                                                htmlFor="message"
                                                className={`absolute text-sm text-[var(--color-primary)] duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[var(--color-background)] px-2 peer-focus:px-2 peer-focus:text-[var(--color-button-bg)] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-6 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-3`}
                                            >
                                                {t('contact.form.message')}
                                            </label>
                                            {activeField === 'message' && (
                                                <motion.div
                                                    layoutId="active-input"
                                                    className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-button-bg)]"
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    exit={{ scaleX: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            )}
                                        </div>

                                        <div className="sm:col-span-2 mt-2">
                                            <motion.button
                                                type="submit"
                                                className="w-full py-3 px-6 text-white font-medium rounded-lg overflow-hidden relative"
                                                disabled={sending}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <span className="relative z-10 flex items-center justify-center">
                                                    {sending ? (
                                                        <>
                                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            {t('contact.form.sending')}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                            </svg>
                                                            {t('contact.form.send')}
                                                        </>
                                                    )}
                                                </span>
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-[var(--color-button-bg)] to-[var(--color-button-bg-hover)]"
                                                    animate={{
                                                        background: [
                                                            'linear-gradient(to right, var(--color-button-bg), var(--color-button-bg-hover))',
                                                            'linear-gradient(to right, var(--color-button-bg), var(--color-button-bg-hover))'
                                                        ]
                                                    }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                />
                                            </motion.button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
