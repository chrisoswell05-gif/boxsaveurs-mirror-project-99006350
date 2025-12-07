-- =============================================
-- FIX RLS POLICIES: Restrict access to admins only
-- =============================================

-- 1. NEWSLETTER_SUBSCRIBERS: Restrict SELECT to admins only
DROP POLICY IF EXISTS "Only authenticated users can view subscribers" ON newsletter_subscribers;
CREATE POLICY "Only admins can view subscribers" ON newsletter_subscribers
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

-- 2. ORDERS: Restrict SELECT and UPDATE to admins only
DROP POLICY IF EXISTS "Authenticated users can view all orders" ON orders;
DROP POLICY IF EXISTS "Authenticated users can update orders" ON orders;

CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update orders" ON orders
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));

-- 3. QUIZ_RESPONSES: Restrict SELECT to admins only
DROP POLICY IF EXISTS "Authenticated users can view all responses" ON quiz_responses;
CREATE POLICY "Admins can view quiz responses" ON quiz_responses
  FOR SELECT USING (has_role(auth.uid(), 'admin'));