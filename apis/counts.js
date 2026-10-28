const { app, supabase } = require('../app');

// app.get('/api/counts/genres', async (req, res) => {
//     const { data, error } = await supabase
//         .from('genre')
//         .select(`genreName,
//             paintinggenres (
//             paintings ()
//             )
//         )`, { count: 'exact', head: true })
//         .order(count, { ascending: true });
//     if (error) {
//         console.error('Error fetching data:', error);
//         return res.status(500).json({ error: error.message });
//     }
//     if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
//     data.slice(0, 1).forEach((d) => console.log(d));
//     return res.json(data);
// });

// app.get('/api/counts/artists', async (req, res) => {
//     const { data, error } = await supabase
//         .from('artists')
//         .select(`paintingID , title, yearOfWork, 
//             paintinggenres (
//             genres ()
//             )
//         )`)
//         .eq('paintinggenres.genres.eraID', req.params.ref)
//         .order('yearOfWork', { ascending: true });
//     if (error) {
//         console.error('Error fetching data:', error);
//         return res.status(500).json({ error: error.message });
//     }
//     if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
//     data.slice(0, 1).forEach((d) => console.log(d));
//     return res.json(data);
// });

app.get('/api/counts/genres', async (req, res) => {
    const { data, error } = await supabase
        .from('CountGenres')
        .select();
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});

app.get('/api/counts/artists', async (req, res) => {
    const { data, error } = await supabase
        .from('CountArtists')
        .select();
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});

app.get('/api/counts/topgenres/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('CountTopGenres')
        .select()
        .gt("Number of Paintings", req.params.ref)
        .order("Number of Paintings", { ascending: false });
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});