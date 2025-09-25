-- Create designers table
CREATE TABLE IF NOT EXISTS public.designers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  bio TEXT,
  brand TEXT,
  location TEXT,
  website_url TEXT,
  instagram_url TEXT,
  tiktok_url TEXT,
  email TEXT,
  phone TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  slug TEXT UNIQUE,
  is_sustainable BOOLEAN DEFAULT FALSE,
  portfolio_images TEXT[],
  category TEXT[],
  subcategory TEXT[],
  is_featured BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT TRUE,
  cover_image TEXT,
  production_location TEXT
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author_name TEXT NOT NULL,
  author_bio TEXT,
  author_image_url TEXT,
  tags TEXT[],
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  location TEXT NOT NULL,
  venue_name TEXT,
  address TEXT,
  ticket_url TEXT,
  price_info TEXT,
  featured_image_url TEXT,
  organizer_name TEXT,
  organizer_contact TEXT,
  capacity INTEGER,
  tags TEXT[],
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create coming_soon_signups table
CREATE TABLE IF NOT EXISTS public.coming_soon_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  interests TEXT[],
  referral_source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor', 'super_admin')),
  permissions TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.designers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coming_soon_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Designers policies
CREATE POLICY "Allow public read access to active designers" ON public.designers
  FOR SELECT USING (status = 'active');

CREATE POLICY "Allow admin full access to designers" ON public.designers
  FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users));

-- Blog posts policies
CREATE POLICY "Allow public read access to published blog posts" ON public.blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Allow admin full access to blog posts" ON public.blog_posts
  FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users));

-- Events policies
CREATE POLICY "Allow public read access to published events" ON public.events
  FOR SELECT USING (published = true);

CREATE POLICY "Allow admin full access to events" ON public.events
  FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users));

-- Coming soon signups policies
CREATE POLICY "Allow public insert to coming soon signups" ON public.coming_soon_signups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin read access to coming soon signups" ON public.coming_soon_signups
  FOR SELECT USING (auth.uid() IN (SELECT id FROM public.admin_users));

-- ✅ Fixed Admin users policies (no self-recursion)
CREATE POLICY "Allow authenticated users to view admin data" ON public.admin_users
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow admin users to update their own data" ON public.admin_users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow insert for admin users" ON public.admin_users
  FOR INSERT WITH CHECK (auth.uid() = id);
