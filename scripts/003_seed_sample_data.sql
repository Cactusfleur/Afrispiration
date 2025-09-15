INSERT INTO public.designers 
(name, bio, location, website_url, instagram_url, email, phone, image_url, portfolio_images, category, subcategory, is_sustainable, cover_image, production_location, slug)
VALUES
-- Designer 1 (Bags)
(
  'Ayesha Khan',
  'Designer specializing in luxury handbags and sustainable accessories.',
  'Lahore, Pakistan',
  'https://ayeshakhanfashion.com',
  'https://instagram.com/ayeshakhanfashion',
  'ayesha@example.com',
  '+92-300-1234567',
  'https://ajax-filters-bc.diviengine.com/sampledata/images/Bag1.jpg',
  ARRAY[
    'https://ajax-filters-bc.diviengine.com/sampledata/images/Bag1-1.jpg',
    'https://ajax-filters-bc.diviengine.com/sampledata/images/Bag1-2.jpg',
    'https://ajax-filters-bc.diviengine.com/sampledata/images/Bag2.jpg'
  ],
  'Accessories',
  'Handbags',
  TRUE,
  'https://ajax-filters-bc.diviengine.com/sampledata/images/Bag2-1.jpg',
  'Pakistan',
  'ayesha-khan'
),

-- Designer 2 (Shirts)
(
  'Omar Sheikh',
  'Luxury menswear designer with a focus on tailored shirts.',
  'Karachi, Pakistan',
  'https://omarsheikhmenswear.com',
  'https://instagram.com/omarsheikhmenswear',
  'omar@example.com',
  '+92-321-7654321',
  'https://ajax-filters-bc.diviengine.com/sampledata/images/Shirt-1---front.jpg',
  ARRAY[
    'https://ajax-filters-bc.diviengine.com/sampledata/images/Shirt-1---back.jpg',
    'https://ajax-filters-bc.diviengine.com/sampledata/images/Shirt-2---front.jpg',
    'https://ajax-filters-bc.diviengine.com/sampledata/images/Shirt-2---back.jpg',
    'https://ajax-filters-bc.diviengine.com/sampledata/images/Shirt-3-blue-front.jpg'
  ],
  'Apparel',
  'Shirts',
  FALSE,
  'https://ajax-filters-bc.diviengine.com/sampledata/images/Shirt-3-yellow-front.jpg',
  'Italy',
  'omar-sheikh'
),

-- Designer 3 (Hoodies)
(
  'Sara Malik',
  'Streetwear designer known for creative hoodie collections.',
  'Islamabad, Pakistan',
  'https://saramalikfashion.com',
  'https://instagram.com/saramalikfashion',
  'sara@example.com',
  '+92-345-1122334',
  'https://ajax-filters-bc.diviengine.com/sampledata/images/Hoodie-1.jpg',
  ARRAY[
    'https://ajax-filters-bc.diviengine.com/sampledata/images/Hoodie-2.jpg',
    'https://ajax-filters-bc.diviengine.com/sampledata/images/Hoodie-3.jpg',
    'https://ajax-filters-bc.diviengine.com/sampledata/images/Hoodie-Women-1.jpg',
    'https://ajax-filters-bc.diviengine.com/sampledata/images/Hoodie-Women-2.jpg',
    'https://ajax-filters-bc.diviengine.com/sampledata/images/Hoodie-Women-3.jpg'
  ],
  'Apparel',
  'Hoodies',
  TRUE,
  'https://ajax-filters-bc.diviengine.com/sampledata/images/Divi-Ninja.jpg',
  'Pakistan',
  'sara-malik'
),

-- Designer 4 (Crop Tops)
(
  'Ali Raza',
  'Trendy women’s wear designer focusing on crop tops.',
  'Dubai, UAE',
  'https://alirazacouture.com',
  'https://instagram.com/alirazacouture',
  'ali@example.com',
  '+971-50-1234567',
  'https://ajax-filters-bc.diviengine.com/sampledata/images/divi-Simplified-croptop-white.jpg',
  ARRAY[
    'https://ajax-filters-bc.diviengine.com/sampledata/images/divi-Simplified-croptop-blue.jpg',
    'https://ajax-filters-bc.diviengine.com/sampledata/images/divi-Simplified-croptop-yellow.jpg'
  ],
  'Apparel',
  'Crop Tops',
  FALSE,
  'https://ajax-filters-bc.diviengine.com/sampledata/images/Dat-Divi_Life.jpg',
  'UAE',
  'ali-raza'
);



-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, author_name, author_bio, tags, featured, published, published_at) VALUES
('The Rise of Sustainable Fashion in Africa', 'rise-of-sustainable-fashion-africa', 'Exploring how African designers are leading the global sustainable fashion movement with innovative approaches to eco-friendly design.', 'African fashion designers are at the forefront of the sustainable fashion revolution, combining traditional techniques with modern innovation to create environmentally conscious designs that honor cultural heritage while addressing contemporary needs...', 'Sarah Johnson', 'Fashion journalist and sustainability advocate with 10 years of experience covering African fashion.', ARRAY['Sustainability', 'African Fashion', 'Innovation'], true, true, NOW() - INTERVAL '2 days'),
('Spotlight: Emerging Designers to Watch', 'emerging-designers-spotlight', 'Meet the next generation of fashion innovators who are reshaping the industry with fresh perspectives and bold creativity.', 'The fashion industry is constantly evolving, driven by emerging talents who bring fresh perspectives and innovative approaches to design. In this spotlight, we feature five rising stars who are making waves in the fashion world...', 'Marcus Chen', 'Fashion editor and trend forecaster specializing in emerging talent discovery.', ARRAY['Emerging Designers', 'Fashion Week', 'Innovation'], false, true, NOW() - INTERVAL '5 days'),
('The Art of Ethical Production', 'art-of-ethical-production', 'Understanding the importance of ethical manufacturing processes and how designers are creating positive change in the industry.', 'Ethical production has become more than just a buzzword in the fashion industry. It represents a fundamental shift towards responsible manufacturing that prioritizes worker welfare, environmental protection, and sustainable practices...', 'Dr. Aisha Patel', 'Sustainable fashion researcher and consultant with expertise in ethical supply chains.', ARRAY['Ethics', 'Production', 'Sustainability'], true, true, NOW() - INTERVAL '1 week');

-- Insert sample events
INSERT INTO public.events (title, slug, description, short_description, event_date, location, venue_name, ticket_url, price_info, organizer_name, tags, featured, published) VALUES
('African Fashion Week Lagos 2024', 'african-fashion-week-lagos-2024', 'The premier fashion event showcasing the best of African design talent. Join us for runway shows, designer exhibitions, and networking opportunities with industry leaders.', 'Premier African fashion showcase with runway shows and exhibitions.', NOW() + INTERVAL '2 months', 'Lagos, Nigeria', 'Eko Convention Centre', 'https://tickets.afw-lagos.com', 'From ₦15,000', 'African Fashion Week Organization', ARRAY['Fashion Week', 'Runway', 'Networking'], true, true),
('Sustainable Fashion Summit', 'sustainable-fashion-summit', 'A comprehensive conference focusing on sustainable practices in fashion design, production, and retail. Features keynote speakers, panel discussions, and workshops.', 'Conference on sustainable fashion practices and innovation.', NOW() + INTERVAL '6 weeks', 'Cape Town, South Africa', 'Cape Town International Convention Centre', 'https://sustainablefashionsummit.com/tickets', 'R850 - R2,500', 'Green Fashion Initiative', ARRAY['Sustainability', 'Conference', 'Workshop'], true, true),
('Designer Networking Mixer', 'designer-networking-mixer', 'An intimate networking event for fashion designers, buyers, and industry professionals. Connect with peers, share ideas, and explore collaboration opportunities.', 'Intimate networking event for fashion professionals.', NOW() + INTERVAL '3 weeks', 'Accra, Ghana', 'Kempinski Hotel Gold Coast City', 'https://eventbrite.com/designer-mixer', 'GH₵120', 'Ghana Fashion Collective', ARRAY['Networking', 'Collaboration'], false, true);
