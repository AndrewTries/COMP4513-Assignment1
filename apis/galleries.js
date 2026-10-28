const { app, supabase } = require('../app');

app.get('/api/galleries', async (req, res) => {
    const { data, error } = await supabase
        .from('galleries')
        .select();
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    data.slice(0, 1).forEach((d) => console.log(d));
    res.json(data);
});

app.get('/api/galleries/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('galleries')
        .select()
        .eq('galleryId', req.params.ref);
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    data.slice(0, 1).forEach((d) => console.log(d));
    res.json(data);
});

app.get('/api/galleries/country/:substring', async (req, res) => {
    const { data, error } = await supabase
        .from('galleries')
        .select()
        .ilike('galleryCountry', `${req.params.substring}%`);
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    data.slice(0, 1).forEach((d) => console.log(d));
    res.json(data);
});