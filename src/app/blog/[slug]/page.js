import { createClient } from '@/utils/supabase/client';
import { notFound } from 'next/navigation';
import BlogPostClient from '@/components/BlogPostClient';
import { mockPosts } from '../mockData';

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  
  /* Use simple mock logic or Client-side logic for static generation to avoid cookies error */
  let post = null;
  
  // Try to use Supabase only if we are in a request context where cookies might work (SSR)
  // BUT this component is being run at build time too.
  // We should better catch the error or use a safe client for data fetching.
  
  // Actually, for static params and SSG, we can use a client that doesn't use cookies()
  // We'll import the browser client creator but running on server? 
  // No, better to use just fetch or supabase-js if available, or just mock data for now.
  
  const supabase = createClient();
  
  try {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .or(`slug.eq.${slug},id.eq.${slug}`)
      .single();
    if (data) post = data;
  } catch (e) {
    // console.log('Supabase fetch error', e); 
  }

  // If not found in Supabase/Error, check mock data
  if (!post) {
    post = mockPosts.find(p => p.slug === slug || p.id.toString() === slug);
  }

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}

// Generate static params for all posts
export async function generateStaticParams() {
  // Use client without cookies for static generation
  const supabase = createClient();
  let posts = [];
  
  try {
    const { data } = await supabase
      .from('posts')
      .select('slug, id');
    
    if (data) posts = data;
  } catch (e) {
    // Ignore
  }

  // Combine with mock data
  const mockParams = mockPosts.map(p => ({
    slug: p.slug || p.id.toString()
  }));

  const dbParams = posts.map((post) => ({
    slug: post.slug || post.id.toString(),
  }));
  
  // Return unique params
  const uniqueParams = [];
  const map = new Map();
  for (const item of [...mockParams, ...dbParams]) {
    if(!map.has(item.slug)){
        map.set(item.slug, true);
        uniqueParams.push(item);
    }
  }

  return uniqueParams;
}
