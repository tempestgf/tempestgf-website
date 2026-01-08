import { notFound } from 'next/navigation';
import BlogPostClient from '@/components/BlogPostClient';
import { mockPosts } from '../mockData';

// Dynamic rendering to avoid static generation issues with Supabase
export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  let post = null;
  
  // Try Supabase only at runtime (not during build)
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { createClient } = await import('@/utils/supabase/client');
      const supabase = createClient();
      
      const { data } = await supabase
        .from('posts')
        .select('*')
        .or(`slug.eq.${slug},id.eq.${slug}`)
        .single();
      
      if (data) post = data;
    } catch (e) {
      // Supabase not available, will use mock data
    }
  }

  // Fallback to mock data
  if (!post) {
    post = mockPosts.find(p => p.slug === slug || p.id.toString() === slug);
  }

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}

// Generate static params using only mock data (no Supabase dependency)
export async function generateStaticParams() {
  return mockPosts.map(p => ({
    slug: p.slug || p.id.toString()
  }));
}
