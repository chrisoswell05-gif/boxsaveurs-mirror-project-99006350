-- Drop the overly permissive policy that exposes all profile data
DROP POLICY IF EXISTS "Anyone can view referral codes" ON public.profiles;

-- Create a secure RPC function to get referrer info by code (only returns what's needed for the referral email)
CREATE OR REPLACE FUNCTION public.get_referrer_by_code(referrer_code TEXT)
RETURNS TABLE(email TEXT, full_name TEXT)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT email, full_name
  FROM public.profiles
  WHERE referral_code = referrer_code
  LIMIT 1;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.get_referrer_by_code(TEXT) TO anon, authenticated;