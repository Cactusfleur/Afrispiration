-- Create a default admin user (you'll need to update the email and create the auth user first)
-- This is just the profile entry - the actual auth user needs to be created through Supabase Auth

-- Example admin user profile (replace with actual user ID after creating auth user)
INSERT INTO public.admin_users (id, role, permissions) 
VALUES (
  '343034b5-ea7b-4d05-bba3-5c09fef62feb',
  'super_admin',
  ARRAY['manage_designers', 'manage_blog', 'manage_events', 'manage_users', 'view_analytics']
);

-- For now, we'll create a placeholder that can be updated later
-- You can run this after creating an auth user in the Supabase dashboard
