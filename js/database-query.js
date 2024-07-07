async function databaseQuery(keys) {
    const url = keys.site;
    const key = keys.supabase;
    const database = supabase.createClient(url,key);
    console.log(database);

    const res = await database.from("clues").insert({
        id: 2,
        status: "This is another clue"
    })

    console.log(res);
}

async function captureMarker(keys, marker, team) {
    const url = keys.site;
    const key = keys.supabase;
    const database = supabase.createClient(url,key);


    const res = await database.from("clues").insert({
        id: 2,
        status: "This is another clue"
    })

}

async function checkStatus(keys,marker) {

    const url = keys.site;
    const key = keys.supabase;
    const database = supabase.createClient(url,key);

    const { data, error } = await supabase
        .from('clues')
        .select('status')
        .eq('id',marker)
    console.log(data);
}
