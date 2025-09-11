-- Create designers table
CREATE TABLE IF NOT EXISTS public.designers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  bio TEXT,
  location TEXT,
  website_url TEXT,
  instagram_url TEXT,
  email TEXT,
  phone TEXT,
  image_url TEXT,
  specialties TEXT[], -- Array of specialties like ["Fashion", "Accessories", "Sustainable"]
  years_experience INTEGER,
  price_range TEXT, -- e.g., "$$", "$$$", "$$$$"
  sustainability_rating INTEGER CHECK (sustainability_rating >= 1 AND sustainability_rating <= 5),
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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
  tags TEXT[], -- Array of tags
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
  tags TEXT[], -- Array of tags like ["Fashion Week", "Networking", "Workshop"]
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create coming_soon_signups table for email collection
CREATE TABLE IF NOT EXISTS public.coming_soon_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  interests TEXT[], -- What they're interested in
  referral_source TEXT, -- How they heard about us
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin users table (references auth.users)
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor', 'super_admin')),
  permissions TEXT[], -- Array of permissions
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.designers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coming_soon_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no auth required for public content)
-- Designers policies
CREATE POLICY "Allow public read access to active designers" ON public.designers
  FOR SELECT USING (status = 'active');

CREATE POLICY "Allow admin full access to designers" ON public.designers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid()
    )
  );

-- Blog posts policies  
CREATE POLICY "Allow public read access to published blog posts" ON public.blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Allow admin full access to blog posts" ON public.blog_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid()
    )
  );

-- Events policies
CREATE POLICY "Allow public read access to published events" ON public.events
  FOR SELECT USING (published = true);

CREATE POLICY "Allow admin full access to events" ON public.events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid()
    )
  );

-- Coming soon signups policies
CREATE POLICY "Allow public insert to coming soon signups" ON public.coming_soon_signups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin read access to coming soon signups" ON public.admin_users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid()
    )
  );

-- Admin users policies
CREATE POLICY "Allow admin users to view their own data" ON public.admin_users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Allow super admin full access to admin users" ON public.admin_users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );
