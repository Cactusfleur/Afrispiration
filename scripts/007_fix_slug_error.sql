-- First add the slug column to designers table
ALTER TABLE designers ADD COLUMN IF NOT EXISTS slug TEXT;

-- Generate slugs for existing designers based on their names
UPDATE designers SET slug = 
  CASE 
    WHEN name = 'Adunni Ade' THEN 'adunni-ade'
    WHEN name = 'Kwame Koranteng' THEN 'kwame-koranteng'
    WHEN name = 'Amara Okafor' THEN 'amara-okafor'
    WHEN name = 'Zara Mohammed' THEN 'zara-mohammed'
    ELSE LOWER(REPLACE(REPLACE(name, ' ', '-'), '''', ''))
  END
WHERE slug IS NULL;

-- Make slug unique after populating
ALTER TABLE designers ADD CONSTRAINT designers_slug_unique UNIQUE (slug);

-- Add the new fields
ALTER TABLE designers 
ADD COLUMN IF NOT EXISTS is_sustainable BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS country_of_design TEXT,
ADD COLUMN IF NOT EXISTS made_in_country TEXT,
ADD COLUMN IF NOT EXISTS portfolio_images TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS subcategory TEXT,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- Update existing sample data with new fields using names instead of slugs
UPDATE designers SET 
  is_sustainable = TRUE,
  country_of_design = 'Nigeria',
  made_in_country = 'Nigeria',
  portfolio_images = ARRAY['/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300'],
  category = 'Women',
  subcategory = 'Ready to Wear (RTW)',
  is_featured = TRUE
WHERE name = 'Adunni Ade';

UPDATE designers SET 
  is_sustainable = FALSE,
  country_of_design = 'South Africa',
  made_in_country = 'South Africa',
  portfolio_images = ARRAY['/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300'],
  category = 'Men',
  subcategory = 'Ready to Wear (RTW)',
  is_featured = TRUE
WHERE name = 'Kwame Koranteng';

UPDATE designers SET 
  is_sustainable = TRUE,
  country_of_design = 'Kenya',
  made_in_country = 'Kenya',
  portfolio_images = ARRAY['/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300'],
  category = 'Accessories',
  subcategory = 'Ready to Wear (RTW)'
WHERE name = 'Amara Okafor';

UPDATE designers SET 
  is_sustainable = FALSE,
  country_of_design = 'Ghana',
  made_in_country = 'Ghana',
  portfolio_images = ARRAY['/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300', '/placeholder.svg?height=400&width=300'],
  category = 'Women',
  subcategory = 'Ready to Wear (RTW)'
WHERE name = 'Zara Mohammed';

-- Update categories for any existing specialties data
UPDATE designers SET category = 
  CASE 
    WHEN 'Womenswear' = ANY(specialties) THEN 'Women'
    WHEN 'Menswear' = ANY(specialties) THEN 'Men'
    WHEN 'Accessories' = ANY(specialties) THEN 'Accessories'
    ELSE 'Women'
  END
WHERE category IS NULL;

-- Set default subcategory for any remaining records
UPDATE designers SET subcategory = 'Ready to Wear (RTW)' WHERE subcategory IS NULL;
