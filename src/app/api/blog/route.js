import { NextResponse } from 'next/server';
import { blogDb } from '@/lib/redis';
import { sanitizePost, validatePost } from '@/lib/blogUtils';

// Helper to verify admin authentication
function verifyAuth(request) {
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'; // Default for dev

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false;
    }

    const token = authHeader.substring(7);
    return token === adminPassword;
}

// GET: Retrieve all published blog posts
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const includeAll = searchParams.get('all') === 'true';
        const isAuthenticated = verifyAuth(request);

        let posts;

        if (includeAll && isAuthenticated) {
            // Admin can see all posts including drafts
            posts = await blogDb.getAllPosts();
        } else {
            // Public can only see published posts
            posts = await blogDb.getPublishedPosts();
        }

        return NextResponse.json({
            success: true,
            posts,
            count: posts.length,
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}

// POST: Create new blog post (admin only)
export async function POST(request) {
    try {
        // Verify authentication
        if (!verifyAuth(request)) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();

        // Sanitize and validate post data
        const sanitizedPost = sanitizePost(body);
        const validation = validatePost(sanitizedPost);

        if (!validation.isValid) {
            return NextResponse.json(
                { success: false, errors: validation.errors },
                { status: 400 }
            );
        }

        // Check if slug already exists
        const existingPost = await blogDb.getPostBySlug(sanitizedPost.slug);
        if (existingPost) {
            return NextResponse.json(
                { success: false, error: 'A post with this slug already exists' },
                { status: 409 }
            );
        }

        // Create the post
        const newPost = await blogDb.createPost(sanitizedPost);

        return NextResponse.json({
            success: true,
            post: newPost,
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create post' },
            { status: 500 }
        );
    }
}
