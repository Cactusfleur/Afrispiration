-- Migration script to convert designer location fields from TEXT to TEXT[] arrays
-- This handles existing data by converting single strings to single-element arrays

-- First, add temporary columns with array types
ALTER TABLE public.designers 
ADD COLUMN location_temp TEXT[],
ADD COLUMN production_location_temp TEXT[];

-- Convert existing single string values to arrays
-- Handle NULL values and empty strings appropriately
UPDATE public.designers 
SET 
  location_temp = CASE 
    WHEN location IS NULL OR location = '' THEN NULL
    ELSE ARRAY[location]
  END,
  production_location_temp = CASE 
    WHEN production_location IS NULL OR production_location = '' THEN NULL
    ELSE ARRAY[production_location]
  END;

-- Drop the old columns
ALTER TABLE public.designers 
DROP COLUMN location,
DROP COLUMN production_location;

-- Rename the temporary columns to the original names
ALTER TABLE public.designers 
RENAME COLUMN location_temp TO location;
ALTER TABLE public.designers 
RENAME COLUMN production_location_temp TO production_location;

-- Add comments to document the new array structure
COMMENT ON COLUMN public.designers.location IS 'Array of African countries representing designer nationality (max 2)';
COMMENT ON COLUMN public.designers.production_location IS 'Array of world countries where items are produced (max 2)';
