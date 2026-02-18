import fs from 'fs';
import path from 'path';

// Path to local JSON storage
const DATA_DIR = path.join(process.cwd(), 'data');
const POSTS_FILE = path.join(DATA_DIR, 'blog-posts.json');

// Ensure data directory exists
function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

// Read posts from file
function readPosts() {
    try {
        ensureDataDir();
        if (!fs.existsSync(POSTS_FILE)) {
            return [];
        }
        const data = fs.readFileSync(POSTS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading posts:', error);
        return [];
    }
}

// Write posts to file
function writePosts(posts) {
    try {
        ensureDataDir();
        fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
    } catch (error) {
        console.error('Error writing posts:', error);
        throw error;
    }
}

// Helper functions for blog operations
export const blogDb = {
    // Get all blog posts
    async getAllPosts() {
        try {
            const posts = readPosts();
            return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } catch (error) {
            console.error('Error getting all posts:', error);
            return [];
        }
    },

    // Get published posts only
    async getPublishedPosts() {
        const allPosts = await this.getAllPosts();
        return allPosts.filter(post => post.status === 'published');
    },

    // Get single post by ID
    async getPost(id) {
        try {
            const posts = readPosts();
            return posts.find(post => post.id === id) || null;
        } catch (error) {
            console.error('Error getting post:', error);
            return null;
        }
    },

    // Get post by slug
    async getPostBySlug(slug) {
        try {
            const posts = readPosts();
            return posts.find(post => post.slug === slug) || null;
        } catch (error) {
            console.error('Error getting post by slug:', error);
            return null;
        }
    },

    // Create new post
    async createPost(postData) {
        try {
            const posts = readPosts();
            const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            const post = {
                id,
                ...postData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            posts.push(post);
            writePosts(posts);
            return post;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    },

    // Update existing post
    async updatePost(id, postData) {
        try {
            const posts = readPosts();
            const index = posts.findIndex(post => post.id === id);

            if (index === -1) {
                throw new Error('Post not found');
            }

            const updatedPost = {
                ...posts[index],
                ...postData,
                id: posts[index].id, // Prevent ID change
                createdAt: posts[index].createdAt, // Preserve creation date
                updatedAt: new Date().toISOString(),
            };

            posts[index] = updatedPost;
            writePosts(posts);
            return updatedPost;
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    },

    // Delete post
    async deletePost(id) {
        try {
            const posts = readPosts();
            const filteredPosts = posts.filter(post => post.id !== id);

            if (posts.length === filteredPosts.length) {
                throw new Error('Post not found');
            }

            writePosts(filteredPosts);
            return { success: true };
        } catch (error) {
            console.error('Error deleting post:', error);
            throw error;
        }
    },

    // Get statistics
    async getStats() {
        try {
            const allPosts = await this.getAllPosts();
            const published = allPosts.filter(p => p.status === 'published').length;
            const drafts = allPosts.filter(p => p.status === 'draft').length;

            return {
                total: allPosts.length,
                published,
                drafts,
            };
        } catch (error) {
            console.error('Error getting stats:', error);
            return { total: 0, published: 0, drafts: 0 };
        }
    },
};

export default { blogDb };
