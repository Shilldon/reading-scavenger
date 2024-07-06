// Connect to our database 
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(`${keys.site}`, keys.supabase)

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
