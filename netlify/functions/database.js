/*require('dotenv').config();
const {
    SITE,
    SUPABASE
} = process.env;*/

// Connect to our database 
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rqkdrjczypzxuyzyrins.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxa2RyamN6eXB6eHV5enlyaW5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzMDA3NDAsImV4cCI6MjAzNTg3Njc0MH0.yzsaK3btoSwnYlVxxWiGSw0FDzt0UMdRzORtAzCWp5Y');

// Our standard serverless handler function
//exports.handler = async event => {
export default async () => {
  // Insert a row
    const { data, error } = await supabase
        .from('clues')
        .insert([
            { status: 'THis is a clue' },
        ]);

  // Did it work?
  return new Response(data,error);
  
}
