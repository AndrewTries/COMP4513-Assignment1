const { app, supabase } = require('../app');

// 	Returns all the galleries (for this, and other gallery requests, the apis return all the fields in the galleries table)
app.get('/api/galleries', async (req, res) => {
    const { data, error } = await supabase
        .from('galleries')
        .select();
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});

// 	Returns just the specified gallery e.g., /api/galleries/30
app.get('/api/galleries/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('galleries')
        .select()
        .eq('galleryId', req.params.ref);
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});

// Returns the galleries whose galleryCountry (case insensitive) begins with the provided substring, e.g., /api/galleries/country/fra
app.get('/api/galleries/country/:substring', async (req, res) => {
    const { data, error } = await supabase
        .from('galleries')
        .select()
        .ilike('galleryCountry', `${req.params.substring}%`);
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});