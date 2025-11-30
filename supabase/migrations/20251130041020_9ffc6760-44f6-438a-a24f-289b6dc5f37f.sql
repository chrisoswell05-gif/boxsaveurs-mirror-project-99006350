-- Update the handle_new_user function to assign admin role to first user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_count INTEGER;
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, email, full_name, referral_code)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    generate_referral_code()
  );
  
  -- Check if this is the first user
  SELECT COUNT(*) INTO user_count FROM public.user_roles;
  
  -- If this is the first user, make them admin
  IF user_count = 0 THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  ELSE
    -- Otherwise, assign regular user role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
  END IF;
  
  RETURN NEW;
END;
$$;