/*require('dotenv').config();
const {
    SITE,
    SUPABASE
} = process.env;*/

// Connect to our database 
const DATABASE_URL = process.env.get("SUPABASE_SITE");
const SUPABASE_SERVICE_API_KEY = process.env.get("SUPABASE");
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);

// Our standard serverless handler function
//exports.handler = async event => {
    exports.handler = async event => {

        // Insert a row
          const { data, error } = await supabase
              .from('clues')
              .insert([
                  { id: 2, status: 'I need to not forget this' },
              ]);
      
        // Did it work?
        console.log(data, error);
        
      }