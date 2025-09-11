-- Fix infinite recursion in RLS policies
-- Drop problematic policies first
DROP POLICY IF EXISTS "Allow admin read access to coming soon signups" ON public.admin_users;
DROP POLICY IF EXISTS "Allow admin users to view their own data" ON public.admin_users;
DROP POLICY IF EXISTS "Allow super admin full access to admin users" ON public.admin_users;

-- Create correct policies for coming_soon_signups
DROP POLICY IF EXISTS "Allow admin read access to coming soon signups" ON public.coming_soon_signups;
CREATE POLICY "Allow admin read access to coming soon signups" ON public.coming_soon_signups
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE id = auth.uid()
    )
  );

-- Create simpler admin_users policies without self-reference
CREATE POLICY "Allow authenticated users to view admin data" ON public.admin_users
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow admin users to update their own data" ON public.admin_users
  FOR UPDATE USING (auth.uid() = id);

-- Allow insert for new admin users (should be done via function in production)
CREATE POLICY "Allow insert for admin users" ON public.admin_users
  FOR INSERT WITH CHECK (auth.uid() = id);
