-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_designers_status ON public.designers(status);
CREATE INDEX IF NOT EXISTS idx_designers_featured ON public.designers(featured);
CREATE INDEX IF NOT EXISTS idx_designers_specialties ON public.designers USING GIN(specialties);
CREATE INDEX IF NOT EXISTS idx_designers_location ON public.designers(location);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON public.blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

CREATE INDEX IF NOT EXISTS idx_events_published ON public.events(published);
CREATE INDEX IF NOT EXISTS idx_events_featured ON public.events(featured);
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_tags ON public.events USING GIN(tags);

CREATE INDEX IF NOT EXISTS idx_coming_soon_email ON public.coming_soon_signups(email);
CREATE INDEX IF NOT EXISTS idx_coming_soon_created ON public.coming_soon_signups(created_at DESC);
