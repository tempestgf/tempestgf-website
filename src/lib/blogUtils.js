// Utility functions for blog operations

/**
 * Generate URL-friendly slug from title
 */
export function generateSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Calculate estimated reading time
 * @param {string} content - HTML or text content
 * @returns {number} - Reading time in minutes
 */
export function calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, ''); // Strip HTML tags
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime || 1; // Minimum 1 minute
}

/**
 * Format date for display
 */
export function formatDate(dateString, locale = 'es-ES') {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

/**
 * Format date for relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(dateString, locale = 'es-ES') {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(diffInSeconds / secondsInUnit);
        if (interval >= 1) {
            return rtf.format(-interval, unit);
        }
    }

    return rtf.format(0, 'second');
}

/**
 * Truncate text to specified length
 */
export function truncateText(text, maxLength = 150) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}

/**
 * Strip HTML tags from content
 */
export function stripHtml(html) {
    return html.replace(/<[^>]*>/g, '');
}

/**
 * Generate excerpt from content
 */
export function generateExcerpt(content, maxLength = 200) {
    const text = stripHtml(content);
    return truncateText(text, maxLength);
}

/**
 * Generate SEO meta description
 */
export function generateMetaDescription(post) {
    if (post.excerpt) {
        return truncateText(post.excerpt, 160);
    }
    return generateExcerpt(post.content, 160);
}

/**
 * Validate blog post data
 */
export function validatePost(postData) {
    const errors = [];

    if (!postData.title || postData.title.trim().length === 0) {
        errors.push('Title is required');
    }

    if (!postData.slug || postData.slug.trim().length === 0) {
        errors.push('Slug is required');
    }

    if (!postData.content || postData.content.trim().length === 0) {
        errors.push('Content is required');
    }

    if (!postData.status || !['draft', 'published'].includes(postData.status)) {
        errors.push('Invalid status. Must be "draft" or "published"');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * Sanitize blog post data before saving
 */
export function sanitizePost(postData) {
    return {
        title: postData.title?.trim() || '',
        slug: postData.slug?.trim() || generateSlug(postData.title || ''),
        content: postData.content || '',
        excerpt: postData.excerpt?.trim() || generateExcerpt(postData.content || ''),
        featuredImage: postData.featuredImage || '',
        category: postData.category?.trim() || 'General',
        tags: Array.isArray(postData.tags) ? postData.tags : [],
        status: postData.status || 'draft',
        author: postData.author?.trim() || 'Admin',
        seoTitle: postData.seoTitle?.trim() || postData.title?.trim() || '',
        seoDescription: postData.seoDescription?.trim() || generateMetaDescription({
            excerpt: postData.excerpt,
            content: postData.content
        }),
    };
}

/**
 * Get unique categories from posts
 */
export function getCategories(posts) {
    const categories = new Set();
    posts.forEach(post => {
        if (post.category) {
            categories.add(post.category);
        }
    });
    return Array.from(categories).sort();
}

/**
 * Get unique tags from posts
 */
export function getTags(posts) {
    const tags = new Set();
    posts.forEach(post => {
        if (post.tags && Array.isArray(post.tags)) {
            post.tags.forEach(tag => tags.add(tag));
        }
    });
    return Array.from(tags).sort();
}

/**
 * Filter posts by category
 */
export function filterByCategory(posts, category) {
    if (!category || category === 'all') return posts;
    return posts.filter(post => post.category === category);
}

/**
 * Filter posts by tag
 */
export function filterByTag(posts, tag) {
    if (!tag) return posts;
    return posts.filter(post => post.tags && post.tags.includes(tag));
}

/**
 * Search posts by query
 */
export function searchPosts(posts, query) {
    if (!query || query.trim().length === 0) return posts;

    const searchTerm = query.toLowerCase();

    return posts.filter(post => {
        return (
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt?.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm) ||
            post.category?.toLowerCase().includes(searchTerm) ||
            post.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    });
}
