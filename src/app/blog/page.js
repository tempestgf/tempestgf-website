import BlogClient from '@/components/BlogClient';
import { mockPosts } from './mockData';

// Force dynamic to avoid build-time Supabase issues
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  let posts = [];
  
  // Try Supabase only at runtime if env vars are available
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { createClient } = await import('@/utils/supabase/server');
      const supabase = await createClient();
      
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!error && data && data.length > 0) {
        posts = data;
      }
    } catch (error) {
      console.warn('Supabase not available, using mock data');
    }
  }

  // Fallback to mock data
  if (!posts || posts.length === 0) {
    posts = mockPosts;
  }

  return <BlogClient posts={posts} />;
}
