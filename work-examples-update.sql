CREATE TABLE IF NOT EXISTS work_examples (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL,
  initials          TEXT NOT NULL,
  description       TEXT,
  logo_url          TEXT,
  tags              TEXT,
  support_items     TEXT,
  testimonial       TEXT,
  testimonial_cite  TEXT,
  social_url        TEXT,
  social_label      TEXT DEFAULT 'View social page',
  sort_order        INTEGER DEFAULT 0,
  published         BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE work_examples ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read published work examples" ON work_examples;
DROP POLICY IF EXISTS "Admin can manage work examples" ON work_examples;

CREATE POLICY "Public can read published work examples" ON work_examples FOR SELECT USING (published = TRUE);
CREATE POLICY "Admin can manage work examples" ON work_examples FOR ALL TO authenticated USING (true);

INSERT INTO work_examples (name, initials, description, tags, support_items, testimonial, testimonial_cite, social_url, social_label, sort_order)
SELECT * FROM (VALUES
  ('Holiday Haven Parks','HH','A network of 12 council-operated tourist parks stretching from Kangaroo Valley to Lake Tabourie on the NSW South Coast. Managed under Shoalhaven City Council.','Social media management,Content strategy,Google Business','Full social media management across Instagram, Facebook and Google Business Profile|30-day content calendars with captions, visual direction and posting schedules|Content strategy, brand voice guide and content pillars for 12 parks|Canva templates for consistent on-brand visuals|Reporting, engagement strategy and platform-specific optimisation','Tara made everything feel simple and achievable. We finally had a clear plan instead of a long list of things we kept putting off.','Holiday Haven','https://www.instagram.com/holidayhaventouristparks','View Instagram',1),
  ('Australian Community Education College','ACEC','Community education and vocational training provider on the NSW South Coast. ACEC supports students through nationally recognised qualifications in early childhood education and care.','Social media,Content creation,Training resources','Social media content planning, caption writing and scheduling via ContentStudio|Canva template creation for consistent post formatting across platforms|Training and resource document support for student-facing materials',NULL,NULL,NULL,'View social page',2),
  ('Mother''s Day Classic Huskisson','MDC','Annual community fun run in Huskisson on the NSW South Coast, raising funds for women''s cancer research through the National Breast Cancer Foundation.','Event promotion,Community,Social content','Social media content for event promotion and community engagement|Canva graphics for event marketing and registration promotion|Caption writing across Instagram and Facebook',NULL,NULL,NULL,'View social page',3),
  ('South Coast Demolition and Excavation','SCD','Trades and excavation business on the NSW South Coast. Demolition, earthworks and site preparation for residential and commercial clients.','Operations,Admin systems,Job management','Operations management and internal systems support|Job file management and admin process improvement|Payroll and wage processing support',NULL,NULL,NULL,NULL,4)
) AS v(name,initials,description,tags,support_items,testimonial,testimonial_cite,social_url,social_label,sort_order)
WHERE NOT EXISTS (SELECT 1 FROM work_examples LIMIT 1);

-- Leads table for homepage email capture
CREATE TABLE IF NOT EXISTS leads (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT NOT NULL,
  source     TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can submit a lead" ON leads;
CREATE POLICY "Anyone can submit a lead" ON leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Admin reads leads" ON leads FOR SELECT TO authenticated USING (true);
GRANT INSERT ON leads TO anon;
GRANT SELECT ON leads TO authenticated;
