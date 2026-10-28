const { app, supabase } = require('../app');

app.get('/api/artists', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select();
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.send(data);
});

app.get('/api/artists/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select()
        .eq('artistId', req.params.ref);
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});

app.get('/api/artists/search/:substring', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select()
        .ilike('lastName', `${req.params.substring}%`);
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});

app.get('/api/artists/country/:substring', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select()
        .ilike('nationality', `${req.params.substring}%`);
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});
