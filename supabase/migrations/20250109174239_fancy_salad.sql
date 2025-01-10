/*
  # Video Summaries Schema

  1. New Tables
    - video_summaries
      - id (uuid, primary key)
      - created_at (timestamp)
      - video_url (text)
      - video_title (text)
      - summary (text)
      - user_id (uuid, foreign key to auth.users)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS video_summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  video_url text NOT NULL,
  video_title text NOT NULL,
  summary text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id)
);

ALTER TABLE video_summaries ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own summaries
CREATE POLICY "Users can read own summaries"
  ON video_summaries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert their own summaries
CREATE POLICY "Users can insert own summaries"
  ON video_summaries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);