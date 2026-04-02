import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.https://wfenclffcqyeqbujfyas.supabase.co
const supabaseAnonKey = import.meta.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmZW5jbGZmY3F5ZXFidWpmeWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NTk4NjYsImV4cCI6MjA4ODMzNTg2Nn0.JDwWPHQ28Wa2n04XUoNIGVMysNKf30ZRGhmg2a-BeT4

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

