import { NextResponse } from 'next/server';
import { blogDb } from '@/lib/redis';

// POST: Admin authentication
export async function POST(request) {
    try {
        const body = await request.json();
        const { password } = body;

        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

        if (password === adminPassword) {
            return NextResponse.json({
                success: true,
                token: adminPassword, // In production, use JWT or session tokens
                message: 'Authentication successful',
            });
        } else {
            return NextResponse.json(
                { success: false, error: 'Invalid password' },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        return NextResponse.json(
            { success: false, error: 'Authentication failed' },
            { status: 500 }
        );
    }
}

// GET: Verify token and get statistics (admin only)
export async function GET(request) {
    try {
        const authHeader = request.headers.get('authorization');
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const token = authHeader.substring(7);

        if (token !== adminPassword) {
            return NextResponse.json(
                { success: false, error: 'Invalid token' },
                { status: 401 }
            );
        }

        // Get statistics
        const stats = await blogDb.getStats();

        return NextResponse.json({
            success: true,
            authenticated: true,
            stats,
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.json(
            { success: false, error: 'Verification failed' },
            { status: 500 }
        );
    }
}
