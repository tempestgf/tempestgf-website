import { createClient } from '@/utils/supabase/server';
import BlogClient from '@/components/BlogClient';
import { mockPosts } from './mockData';

export default async function BlogPage() {
  const supabase = await createClient();
  
  // Fetch blog posts from Supabase
  let posts = [];
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    posts = data;
  } catch (error) {
    console.warn('Could not fetch posts from Supabase, using mock data:', error.message);
    // Fallback to mock data if Supabase connection fails or table doesn't exist yet
    posts = mockPosts;
  }

  // If Supabase returns empty (table empty), use mock data for demo purposes
  if (!posts || posts.length === 0) {
    posts = mockPosts;
  }

  return <BlogClient posts={posts || []} />;
}
