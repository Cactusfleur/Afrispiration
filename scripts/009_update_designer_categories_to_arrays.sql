-- Update designers table to support multiple categories and subcategories
ALTER TABLE public.designers 
  ALTER COLUMN category TYPE TEXT[] USING CASE 
    WHEN category IS NULL THEN NULL 
    ELSE ARRAY[category] 
  END;

ALTER TABLE public.designers 
  ALTER COLUMN subcategory TYPE TEXT[] USING CASE 
    WHEN subcategory IS NULL THEN NULL 
    ELSE ARRAY[subcategory] 
  END;

-- Update existing data to convert single values to arrays
UPDATE public.designers 
SET category = ARRAY[category] 
WHERE category IS NOT NULL AND NOT (category = ANY(category));

UPDATE public.designers 
SET subcategory = ARRAY[subcategory] 
WHERE subcategory IS NOT NULL AND NOT (subcategory = ANY(subcategory));
