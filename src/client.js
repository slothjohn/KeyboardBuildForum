import { createClient } from '@supabase/supabase-js'
const URL = 'https://amxfkpnppenyyqrwldlu.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFteGZrcG5wcGVueXlxcndsZGx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIyODMxNTcsImV4cCI6MTk5Nzg1OTE1N30.2lalS31J2jeF1kngm12BAVNLAAjeJAC5psK5PeaAI5k';
export const supabase = createClient(URL, API_KEY);