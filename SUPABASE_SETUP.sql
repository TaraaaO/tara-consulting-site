-- ═══════════════════════════════════════════════════════════
-- TARA CONSULTING CO — FULL DATABASE SETUP
-- Run this once in Supabase SQL editor
-- ═══════════════════════════════════════════════════════════

-- PROFILES (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT,
  full_name     TEXT,
  tier          TEXT DEFAULT 'starter' CHECK (tier IN ('starter', 'growth_partner', 'full_service')),
  last_login    TIMESTAMPTZ,
  login_count   INTEGER DEFAULT 0,
  confirmed_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, tier)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', COALESCE(new.raw_user_meta_data->>'tier', 'starter'))
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- PORTAL RESOURCES
CREATE TABLE IF NOT EXISTS resources (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  description  TEXT,
  category     TEXT,
  filetype     TEXT,
  min_tier     TEXT DEFAULT 'starter',
  file_url     TEXT NOT NULL,
  published    BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- APPROVALS
CREATE TABLE IF NOT EXISTS approvals (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id        UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title            TEXT NOT NULL,
  description      TEXT,
  preview_content  TEXT,
  status           TEXT DEFAULT 'pending' CHECK (status IN ('pending','approved','changes_requested')),
  responded_at     TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- SUGGESTIONS
CREATE TABLE IF NOT EXISTS suggestions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  client_email  TEXT,
  client_name   TEXT,
  resource_type TEXT,
  detail        TEXT NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- DOWNLOAD LOGS
CREATE TABLE IF NOT EXISTS download_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id   UUID REFERENCES resources(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- BLOG POSTS
CREATE TABLE IF NOT EXISTS site_posts (
  id          TEXT PRIMARY KEY,
  tag         TEXT NOT NULL,
  "tagLabel"  TEXT NOT NULL,
  "readTime"  TEXT DEFAULT '3 min read',
  title       TEXT NOT NULL,
  excerpt     TEXT,
  body        TEXT NOT NULL,
  sort_order  INTEGER DEFAULT 0,
  published   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- SITE CONTENT (editable homepage text)
CREATE TABLE IF NOT EXISTS site_content (
  key         TEXT PRIMARY KEY,
  value       TEXT NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own profile"        ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile"      ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Auth users read published res" ON resources FOR SELECT TO authenticated USING (published = TRUE);
CREATE POLICY "Clients see own approvals"     ON approvals FOR SELECT USING (auth.uid() = client_id);
CREATE POLICY "Clients update own approvals"  ON approvals FOR UPDATE USING (auth.uid() = client_id);
CREATE POLICY "Users insert suggestions"      ON suggestions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users read own suggestions"    ON suggestions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users log downloads"           ON download_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users read own downloads"      ON download_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Public read published posts"   ON site_posts FOR SELECT USING (published = TRUE);
CREATE POLICY "Admin manage posts"            ON site_posts FOR ALL TO authenticated USING (true);
CREATE POLICY "Public read site content"      ON site_content FOR SELECT USING (true);
CREATE POLICY "Admin manage site content"     ON site_content FOR ALL TO authenticated USING (true);
