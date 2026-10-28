const { app, supabase } = require('../app');

// Returns all the genres. For this and the following genres requests, the apis also provide all the era fields
app.get('/api/genres', async (req, res) => {
    const { data, error } = await supabase
        .from('genres')
        .select(` 
            *, eras (*) 
        `);
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});

// Returns just the specified genre, e.g., /api/genres/76
app.get('/api/genres/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('genres')
        .select(` 
            *, eras (*)
        `)
        .eq('genreID', req.params.ref);
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});

// Returns the genres used in a given painting (ordered by genreName in ascending order), e.g., /api/genres/painting/408
app.get('/api/genres/painting/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('paintinggenres')
        .select(`
            genres(*, eras (*))                      
        `)
        .eq('paintingId', req.params.ref)
        .order('genreName', { referencedTable: 'genres', ascending: true });
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});