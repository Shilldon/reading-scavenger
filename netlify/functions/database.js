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
    exports.handler = async (event, context) => {
        try {
          const { data, error } = await supabase.from('clues').select('*');
          return {
            statusCode: 200,
            body: JSON.stringify(data),
          };
        } catch (err) {
          return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' }),
          };
        }
      };