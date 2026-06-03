-- Run this in Supabase SQL editor to add the new client fields
-- (these are additions only — won't affect existing data)

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS package TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS start_date TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT FALSE;
