/*
  # Create page content management system

  1. New Tables
    - `page_content`
      - `id` (uuid, primary key)
      - `page_key` (text, unique) - identifies the page (e.g., 'faq', 'about')
      - `content` (jsonb) - stores all editable content for the page
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `page_content` table
    - Add policy for public read access
    - Add policy for admin write access

  3. Initial Data
    - Seed with default content for all pages
*/

CREATE TABLE IF NOT EXISTS public.page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access to page content" ON public.page_content
  FOR SELECT USING (true);

CREATE POLICY "Allow admin full access to page content" ON public.page_content
  FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users));

-- Insert default content for all pages
INSERT INTO public.page_content (page_key, content) VALUES
('faq', '{
  "hero": {
    "title": "Frequently Asked Questions",
    "description": "Find answers to common questions about joining our designer directory and using our platform."
  },
  "questions": [
    {
      "question": "Is there an application fee?",
      "answer": "No, our platform is free for designers. We believe in supporting creative talent without financial barriers."
    },
    {
      "question": "What types of designers do you accept?",
      "answer": "We welcome designers across all categories - fashion, accessories, jewelry, and more. We particularly value innovation, sustainability, and cultural authenticity."
    },
    {
      "question": "How long does the review process take?",
      "answer": "Our curation team typically reviews applications within 2-3 weeks. We''ll keep you updated throughout the process via email."
    },
    {
      "question": "What are the requirements to join?",
      "answer": "You''ll need a portfolio showcasing your design work, professional biography, high-quality images of your collections, information about sustainable practices, and contact details."
    },
    {
      "question": "Can I update my profile after being accepted?",
      "answer": "Yes! Once accepted, you''ll have access to update your profile, add new collections, and manage your presence on the platform."
    },
    {
      "question": "How do you promote featured designers?",
      "answer": "Featured designers are highlighted in our editorial content, social media, newsletters, and special events. We also prioritize them in search results and recommendations."
    },
    {
      "question": "Do you work with emerging designers?",
      "answer": "We''re committed to supporting both emerging and established designers. We look for talent, innovation, and commitment to quality regardless of career stage."
    },
    {
      "question": "What countries do you cover?",
      "answer": "We showcase designers from 54+ countries and diaspora communities worldwide. Our platform celebrates global fashion talent and cultural diversity."
    },
    {
      "question": "How can buyers connect with designers?",
      "answer": "Buyers can browse our directory, view designer profiles, and contact designers directly through our platform. We facilitate connections while respecting designer preferences."
    }
  ],
  "stillHaveQuestions": {
    "title": "Still have questions?",
    "description": "Can''t find what you''re looking for? We''re here to help.",
    "buttonText": "Join Our Directory",
    "buttonUrl": ""
  }
}'),

('about', '{
  "hero": {
    "title": "Celebrating African Design Excellence",
    "description": "We are a vibrant community platform dedicated to showcasing the incredible talent, creativity, and cultural richness of African designers across the continent and diaspora.",
    "primaryButtonText": "Join Our Community",
    "primaryButtonUrl": "/submit",
    "secondaryButtonText": "Explore Designers",
    "secondaryButtonUrl": "/designers"
  },
  "mission": {
    "badge": "Our Mission",
    "title": "Empowering African Creativity Worldwide",
    "description1": "Afrispiration was born from a vision to create a unified platform where African designers can showcase their work, connect with peers, and access opportunities that celebrate their unique perspectives and cultural heritage.",
    "description2": "We believe that African design has the power to inspire global conversations about creativity, innovation, and cultural expression. Our platform serves as a bridge connecting talent across borders and generations."
  },
  "values": [
    {
      "title": "Cultural Pride",
      "description": "Celebrating the rich heritage and diverse traditions that shape African design excellence."
    },
    {
      "title": "Community First",
      "description": "Building bridges between designers across Africa and the diaspora to foster collaboration."
    },
    {
      "title": "Global Impact",
      "description": "Amplifying African voices and creativity on the world stage through meaningful connections."
    },
    {
      "title": "Creative Excellence",
      "description": "Showcasing the highest standards of design innovation and artistic expression."
    }
  ],
  "cta": {
    "title": "Ready to Join Our Community?",
    "description": "Whether you''re a designer looking to showcase your work or someone passionate about African creativity, there''s a place for you in our growing community.",
    "buttonText": "Join as Designer",
    "buttonUrl": "/submit"
  }
}'),

('coming_soon', '{
  "badge": "Coming Soon",
  "title": "Shop Opening Soon",
  "description": "We''re working hard to bring you an amazing shopping experience. Stay tuned for the launch of our designer marketplace.",
  "features": [
    {
      "emoji": "🎨",
      "title": "Curated Designs",
      "description": "Handpicked pieces from talented designers worldwide"
    },
    {
      "emoji": "🌍",
      "title": "Global Marketplace",
      "description": "Connect with designers from every corner of the world"
    },
    {
      "emoji": "♻️",
      "title": "Sustainable Fashion",
      "description": "Supporting eco-friendly and ethical fashion practices"
    }
  ]
}'),

('submit', '{
  "hero": {
    "title": "Join Our Designer Directory",
    "description": "We''re building the world''s most comprehensive platform for discovering exceptional fashion talent. Be part of our curated community of innovative designers."
  },
  "submitCard": {
    "title": "Submit Your Application",
    "description": "Share your work and philosophy to be part of our global directory.",
    "buttonText": "Submit Application",
    "buttonUrl": "https://forms.gle/PSoHZw5gV2sxP5MbA"
  },
  "whatToExpect": [
    {
      "title": "Curated Platform",
      "description": "Join a selective community of designers focused on quality and sustainability."
    },
    {
      "title": "Global Exposure",
      "description": "Reach fashion enthusiasts, buyers, and collaborators from around the world."
    },
    {
      "title": "Featured Opportunities",
      "description": "Get highlighted in our editorial content, events, and designer spotlights."
    }
  ],
  "requirements": {
    "title": "Application Requirements",
    "items": [
      "Portfolio showcasing your design work",
      "Professional biography and design philosophy",
      "High-quality images of your collections",
      "Information about your sustainable practices",
      "Contact details and social media presence"
    ]
  },
  "faq": [
    {
      "question": "Is there an application fee?",
      "answer": "No, our platform is free for designers. We believe in supporting creative talent without financial barriers."
    },
    {
      "question": "What types of designers do you accept?",
      "answer": "We welcome designers across all categories - fashion, accessories, jewelry, and more. We particularly value innovation and sustainability."
    },
    {
      "question": "How long does the review process take?",
      "answer": "Our curation team typically reviews applications within 2-3 weeks. We''ll keep you updated throughout the process."
    }
  ]
}'),

('events', '{
  "hero": {
    "title": "Fashion Events",
    "description": "Discover upcoming fashion shows, networking events, workshops, and industry gatherings. Connect with designers, buyers, and fashion enthusiasts from around the world."
  }
}'),

('blog', '{
  "hero": {
    "title": "Fashion Journal",
    "description": "Insights, trends, and stories from the world of sustainable and innovative fashion design. Discover the latest in fashion culture, designer spotlights, and industry analysis."
  }
}'),

('designers', '{
  "hero": {
    "title": "Discover Exceptional Designers",
    "description": "Explore our curated collection of innovative fashion designers from around the world. Each profile showcases unique perspectives, sustainable practices, and cultural authenticity."
  }
}'),

('footer', '{
  "brand": {
    "name": "Afrispiration",
    "description": "Discovering exceptional fashion talent from around the world. Curated designers, sustainable practices, cultural authenticity."
  },
  "company": {
    "title": "Company",
    "links": [
      { "label": "About Us", "url": "/about" },
      { "label": "FAQ", "url": "/faq" },
      { "label": "Join our directory", "url": "/submit" },
      { "label": "Join our WhatsApp Channel", "url": "https://whatsapp.com/channel/0029VaEMFm5J93wYaEt7tA18" }
    ]
  },
  "social": {
    "instagram": "https://www.instagram.com/afrispiration/",
    "facebook": "https://www.facebook.com/Afrispiration",
    "whatsapp": "https://whatsapp.com/channel/0029VaEMFm5J93wYaEt7tA18"
  },
  "newsletter": {
    "title": "Stay Updated",
    "description": "Get the latest designer spotlights and fashion insights delivered to your inbox."
  },
  "copyright": "© 2025 Afrispiration. All rights reserved."
}');

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_page_content_key ON public.page_content(page_key);