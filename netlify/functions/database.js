/*require('dotenv').config();
const {
    SITE,
    SUPABASE
} = process.env;*/

// Connect to our database 
const DATABASE_URL = Netlify.env.get("SUPABASE_SITE");
const SUPABASE_SERVICE_API_KEY = Netlify.env.get("SUPABASE");
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

// Our standard serverless handler function
//exports.handler = async event => {
export default async () => {
    let { data: clues, error } = await supabase
    .from('clues')
    .select('status')

  // Did it work?
  return new Response(clues);
  
}
