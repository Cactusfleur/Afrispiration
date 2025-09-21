-- Create categories table for dynamic category management
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  subcategories TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories from the existing designer fields
INSERT INTO categories (name, subcategories) VALUES
('Women', ARRAY['Ready to Wear (RTW)', 'Made to measure', 'Bespoke/Custom']),
('Men', ARRAY['Ready to Wear (RTW)', 'Made to measure', 'Bespoke/Custom']),
('Unisex', ARRAY['Ready to Wear (RTW)', 'Made to measure', 'Bespoke/Custom']),
('Kids', ARRAY['Ready to Wear (RTW)', 'Made to measure', 'Bespoke/Custom']),
('Accessories', ARRAY['Handbags', 'Belts', 'Scarves', 'Hats']),
('Shoes', ARRAY['Casual', 'Formal', 'Athletic', 'Boots']),
('Jewellery', ARRAY['Necklaces', 'Earrings', 'Bracelets', 'Rings']),
('Beauty & Fragrance', ARRAY['Skincare', 'Fragrance', 'Hair Care', 'Makeup']),
('Handbags & luggage', ARRAY['Handbags', 'Backpacks', 'Luggage', 'Wallets']),
('Bridal', ARRAY['Wedding Dresses', 'Bridesmaid', 'Accessories']),
('Sportswear', ARRAY['Athletic Wear', 'Activewear', 'Performance']),
('Swimwear', ARRAY['Bikinis', 'One-piece', 'Cover-ups']),
('Textiles', ARRAY['Home Decor', 'Fabrics', 'Upholstery']),
('Lingerie', ARRAY['Bras', 'Underwear', 'Sleepwear']),
('Haute Couture', ARRAY['Evening Wear', 'Custom Design', 'Luxury'])
ON CONFLICT (name) DO NOTHING;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);

-- Add RLS policies
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access to categories" ON categories
  FOR SELECT USING (true);

-- Allow authenticated users to manage categories
CREATE POLICY "Allow authenticated users to manage categories" ON categories
  FOR ALL USING (auth.role() = 'authenticated');
