const { app, supabase } = require('../app');

app.get('/api/paintings/single/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select()
        .eq('paintingID', req.params.ref);
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    data.slice(0, 1).forEach((d) => console.log(d));
    res.json(data);
});

app.get('/api/paintings/sort/:type/limit/:ref', async (req, res) => {
    var field = '';
    if (req.params.type === 'year') field = 'yearOfWork';
    else if (req.params.type === 'title') field = 'title';
    const limit = Number(req.params.ref) == 0 ? 1000 : Number(req.params.ref)
    const { data, error } = await supabase
        .from('paintings')
        .select(`
            *,
            artists(*),
            galleries(*)                    
        `)
        .order(field, { ascending: true })
        .limit(limit);
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    data.slice(0, 1).forEach((d) => console.log(d));
    res.json(data);
});