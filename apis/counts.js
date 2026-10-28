const { app, supabase } = require('../app');

// Returns the genre name and the number of paintings for each genre, sorted by the number of paintings (fewest to most).
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

// Returns the artist name (first name space last name) and the number of paintings for each artist, 
// sorted by the number of paintings (most to fewest).
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

// Returns the genre name and the number of paintings for each genre, 
// sorted by the number of paintings (most to least) for genres having over some set number of paintings, 
// e.g., /api/counts/topgenres/20 would show the painting counts for those genres with more than 20 paintings.
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