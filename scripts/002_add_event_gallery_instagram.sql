-- Add gallery_images and instagram_url columns to events table
ALTER TABLE public.events 
ADD COLUMN gallery_images TEXT[],
ADD COLUMN instagram_url TEXT;

-- Update existing events to have empty arrays for gallery_images
UPDATE public.events 
SET gallery_images = '{}' 
WHERE gallery_images IS NULL;
