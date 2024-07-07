function databaseQuery(keys) {
    const url = keys.site;
    const key = keys.supabase;
    const database = supabase.createClient(url,key);
    console.log(database);
}