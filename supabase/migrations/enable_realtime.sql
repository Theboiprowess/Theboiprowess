-- Enable Realtime for all dashboard tables
-- This allows the admin dashboard to receive real-time updates

-- Enable Realtime for applications table
ALTER PUBLICATION supabase_realtime ADD TABLE applications;

-- Enable Realtime for gallery table
ALTER PUBLICATION supabase_realtime ADD TABLE gallery;

-- Enable Realtime for students table
ALTER PUBLICATION supabase_realtime ADD TABLE students;

-- Enable Realtime for teachers table
ALTER PUBLICATION supabase_realtime ADD TABLE teachers;

-- Enable Realtime for news table
ALTER PUBLICATION supabase_realtime ADD TABLE news;

-- Enable Realtime for events table
ALTER PUBLICATION supabase_realtime ADD TABLE events;
