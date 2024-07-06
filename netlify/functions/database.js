require('dotenv').config();
const {
    SITE,
    SUPABASE
} = process.env;

// Connect to our database 
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SITE, SUPABASE);

// Our standard serverless handler function
//exports.handler = async event => {
export default async () => {
  // Insert a row
    const { data, error } = await supabase
        .from('clues')
        .insert([
            { note: 'THis is a clue' },
        ]);

  // Did it work?
  return new Response(data,error);
  
}
