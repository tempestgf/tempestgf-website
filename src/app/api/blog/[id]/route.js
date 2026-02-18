import { NextResponse } from 'next/server';
import { blogDb } from '@/lib/redis';
import { sanitizePost, validatePost } from '@/lib/blogUtils';

// Helper to verify admin authentication
function verifyAuth(request) {
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false;
    }

    const token = authHeader.substring(7);
    return token === adminPassword;
}

// GET: Retrieve single blog post by ID
export async function GET(request, { params }) {
    try {
        const { id } = params;
        const post = await blogDb.getPost(id);

        if (!post) {
            return NextResponse.json(
                { success: false, error: 'Post not found' },
                { status: 404 }
            );
        }

        // Hide draft posts from non-authenticated users
        if (post.status === 'draft' && !verifyAuth(request)) {
            return NextResponse.json(
                { success: false, error: 'Post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            post,
        });
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch post' },
            { status: 500 }
        );
    }
}

// PUT: Update existing blog post (admin only)
export async function PUT(request, { params }) {
    try {
        // Verify authentication
        if (!verifyAuth(request)) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = params;
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

        // Check if slug is being changed and if it conflicts with another post
        if (sanitizedPost.slug) {
            const existingPost = await blogDb.getPostBySlug(sanitizedPost.slug);
            if (existingPost && existingPost.id !== id) {
                return NextResponse.json(
                    { success: false, error: 'A post with this slug already exists' },
                    { status: 409 }
                );
            }
        }

        // Update the post
        const updatedPost = await blogDb.updatePost(id, sanitizedPost);

        return NextResponse.json({
            success: true,
            post: updatedPost,
        });
    } catch (error) {
        console.error('Error updating post:', error);

        if (error.message === 'Post not found') {
            return NextResponse.json(
                { success: false, error: 'Post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to update post' },
            { status: 500 }
        );
    }
}

// DELETE: Delete blog post (admin only)
export async function DELETE(request, { params }) {
    try {
        // Verify authentication
        if (!verifyAuth(request)) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = params;

        // Check if post exists
        const post = await blogDb.getPost(id);
        if (!post) {
            return NextResponse.json(
                { success: false, error: 'Post not found' },
                { status: 404 }
            );
        }

        // Delete the post
        await blogDb.deletePost(id);

        return NextResponse.json({
            success: true,
            message: 'Post deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete post' },
            { status: 500 }
        );
    }
}
