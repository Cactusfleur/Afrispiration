-- Add home page content to the page_content table
INSERT INTO public.page_content (page_key, content) VALUES
('home', '{
  "hero": {
    "title": "Discover Exceptional",
    "subtitle": "African Fashion",
    "description": "A curated platform showcasing emerging and established African fashion designers from around the world. Explore sustainable, innovative, and culturally rich design.",
    "buttonText": "Explore Designers",
    "buttonUrl": "/designers"
  },
  "stats": {
    "designers": "Curated Designers",
    "events": "Fashion Events",
    "countries": "African Countries + Diaspora"
  },
  "featuredSection": {
    "title": "Featured Designers",
    "description": "Meet the innovative minds shaping the present and future of African fashion with sustainable practices and cultural authenticity.",
    "buttonText": "View All Designers"
  },
  "eventsSection": {
    "title": "Upcoming Events",
    "description": "Join us at the latest fashion events, workshops, and showcases happening around the world.",
    "buttonText": "View All Events"
  },
  "journalSection": {
    "title": "Latest from the Journal",
    "description": "Insights, trends, and stories from the world of sustainable and innovative fashion design.",
    "buttonText": "Read More Articles"
  }
}')
ON CONFLICT (page_key) DO UPDATE SET
  content = EXCLUDED.content,
  updated_at = NOW();
