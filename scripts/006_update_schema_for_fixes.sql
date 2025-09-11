-- Update designers table with new fields for the fixes
ALTER TABLE designers 
ADD COLUMN IF NOT EXISTS is_sustainable BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS country_of_design TEXT,
ADD COLUMN IF NOT EXISTS made_in_country TEXT,
ADD COLUMN IF NOT EXISTS portfolio_images TEXT[] DEFAULT '{}';

-- Update existing sample data with new fields
UPDATE designers SET 
  is_sustainable = TRUE,
  country_of_design = 'Nigeria',
  made_in_country = 'Nigeria',
  portfolio_images = ARRAY['/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300']
WHERE slug = 'adunni-ade';

UPDATE designers SET 
  is_sustainable = FALSE,
  country_of_design = 'South Africa',
  made_in_country = 'South Africa',
  portfolio_images = ARRAY['/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300']
WHERE slug = 'kwame-koranteng';

UPDATE designers SET 
  is_sustainable = TRUE,
  country_of_design = 'Kenya',
  made_in_country = 'Kenya',
  portfolio_images = ARRAY['/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300']
WHERE slug = 'amara-okafor';

UPDATE designers SET 
  is_sustainable = FALSE,
  country_of_design = 'Ghana',
  made_in_country = 'Ghana',
  portfolio_images = ARRAY['/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300']
WHERE slug = 'zara-mohammed';

-- Update categories to match new structure
UPDATE designers SET category = 'Women' WHERE category = 'Womenswear';
UPDATE designers SET category = 'Men' WHERE category = 'Menswear';
UPDATE design+ers SET category = 'Accessories' WHERE category = 'Accessories';

-- Add subcategory field
ALTER TABLE designers ADD COLUMN IF NOT EXISTS subcategory TEXT;

UPDATE designers SET subcategory = 'Ready to Wear (RTW)' WHERE category IN ('Women', 'Men');
UPDATE designers SET subcategory = 'Ready to Wear (RTW)' WHERE category = 'Accessories';

-- Add featured flag for homepage
ALTER TABLE designers ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- Mark some designers as featured
UPDATE designers SET is_featured = TRUE WHERE slug IN ('adunni-ade', 'kwame-koranteng');
