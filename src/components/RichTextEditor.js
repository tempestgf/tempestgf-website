"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RichTextEditor({ value = '', onChange, placeholder = 'Escribe tu contenido aquí...' }) {
    const [content, setContent] = useState(value);
    const [showToolbar, setShowToolbar] = useState(false);
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && content !== editorRef.current.innerHTML) {
            editorRef.current.innerHTML = content;
        }
    }, [value]);

    const handleInput = () => {
        const newContent = editorRef.current?.innerHTML || '';
        setContent(newContent);
        onChange(newContent);
    };

    const execCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        handleInput();
    };

    const insertLink = () => {
        const url = prompt('Ingresa la URL:');
        if (url) {
            execCommand('createLink', url);
        }
    };

    const insertImage = () => {
        const url = prompt('Ingresa la URL de la imagen:');
        if (url) {
            execCommand('insertImage', url);
        }
    };

    const formatBlock = (tag) => {
        execCommand('formatBlock', tag);
    };

    const toolbarButtons = [
        { icon: '𝐁', command: 'bold', title: 'Negrita' },
        { icon: '𝘐', command: 'italic', title: 'Cursiva' },
        { icon: 'U̲', command: 'underline', title: 'Subrayado' },
        { icon: '≡', command: () => formatBlock('p'), title: 'Párrafo' },
        { icon: 'H1', command: () => formatBlock('h2'), title: 'Título 1' },
        { icon: 'H2', command: () => formatBlock('h3'), title: 'Título 2' },
        { icon: 'H3', command: () => formatBlock('h4'), title: 'Título 3' },
        { icon: '•', command: 'insertUnorderedList', title: 'Lista' },
        { icon: '1.', command: 'insertOrderedList', title: 'Lista numerada' },
        { icon: '🔗', command: insertLink, title: 'Enlace' },
        { icon: '🖼', command: insertImage, title: 'Imagen' },
        { icon: '❝', command: () => formatBlock('blockquote'), title: 'Cita' },
        { icon: '</>', command: () => formatBlock('pre'), title: 'Código' },
    ];

    return (
        <div className="w-full">
            {/* Toolbar */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: showToolbar ? 1 : 0.7, y: 0 }}
                className="flex flex-wrap gap-2 p-3 bg-[var(--gray-100)] dark:bg-[var(--gray-800)] rounded-t-xl border border-[var(--color-border)]"
            >
                {toolbarButtons.map((btn, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => typeof btn.command === 'function' ? btn.command() : execCommand(btn.command)}
                        title={btn.title}
                        className="px-3 py-2 bg-[var(--color-background)] hover:bg-[var(--color-button-bg)] hover:text-white rounded-lg transition-all duration-200 text-sm font-semibold border border-[var(--color-border)]"
                    >
                        {btn.icon}
                    </button>
                ))}
            </motion.div>

            {/* Editor */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                onFocus={() => setShowToolbar(true)}
                onBlur={() => setShowToolbar(false)}
                className="min-h-[400px] p-6 bg-[var(--color-background)] border border-t-0 border-[var(--color-border)] rounded-b-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-button-bg)] prose prose-lg max-w-none"
                style={{
                    color: 'var(--color-foreground)',
                }}
                data-placeholder={placeholder}
            />

            <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: var(--color-primary);
          opacity: 0.5;
          pointer-events: none;
        }
        
        [contenteditable] h2 {
          font-size: 2em;
          font-weight: bold;
          margin: 1em 0 0.5em 0;
          color: var(--color-foreground);
        }
        
        [contenteditable] h3 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 1em 0 0.5em 0;
          color: var(--color-foreground);
        }
        
        [contenteditable] h4 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 1em 0 0.5em 0;
          color: var(--color-foreground);
        }
        
        [contenteditable] p {
          margin: 1em 0;
          line-height: 1.8;
          color: var(--color-foreground);
        }
        
        [contenteditable] ul,
        [contenteditable] ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        
        [contenteditable] li {
          margin: 0.5em 0;
        }
        
        [contenteditable] blockquote {
          margin: 1.5em 0;
          padding: 1em 1.5em;
          border-left: 4px solid var(--color-button-bg);
          background: var(--gray-100);
          font-style: italic;
        }
        
        [contenteditable] pre {
          margin: 1.5em 0;
          padding: 1.5em;
          background: var(--gray-900);
          color: #fff;
          border-radius: 8px;
          overflow-x: auto;
          font-family: 'Courier New', monospace;
        }
        
        [contenteditable] a {
          color: var(--color-button-bg);
          text-decoration: underline;
        }
        
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          margin: 1.5em 0;
          border-radius: 8px;
        }
      `}</style>
        </div>
    );
}
