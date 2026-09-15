import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function testConnection() {
  console.log("Testing Supabase connection...")
  
  const { data: projects, error: projectsError } = await supabase.from('projects').select('*')
  console.log("Projects:", projectsError ? projectsError.message : projects)
  
  const { data: experiences, error: expError } = await supabase.from('experiences').select('*')
  console.log("Experiences:", expError ? expError.message : experiences)
}

testConnection()
