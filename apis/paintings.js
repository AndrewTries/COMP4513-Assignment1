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
    if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});

app.get('/api/paintings/sort/:type/limit/:ref', async (req, res) => {
    var field = '';
    if (req.params.type === 'year') field = 'yearOfWork';
    else if (req.params.type === 'title') field = 'title';
    const limit = req.params.ref === null || req.params.ref === '0' ? 1000 : req.params.ref;
    if (isNaN(limit) || isNaN(parseFloat(limit))) return res.status(500).json({ error: 'Limit is not a number.' });
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
    if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});

app.get('/api/paintings/sort/:type/limit/:ref/skip/:ref2', async (req, res) => {
    var field = '';
    if (req.params.type === 'year') field = 'yearOfWork';
    else if (req.params.type === 'title') field = 'title';
    const limit = req.params.ref === '0' ? 1000 : req.params.ref;
    console.log('LIMIT', limit);
    // if (req.params.ref2 === null) req.params.ref2 = 0;
    if (isNaN(limit) || isNaN(parseFloat(limit))) return res.status(500).json({ error: 'Limit is not a number.' });
    if (isNaN(req.params.ref2) || isNaN(parseFloat(req.params.ref2))) return res.status(500).json({ error: 'Skip is not a number.' });
    const { data, error } = await supabase
        .from('paintings')
        .select(`
            *,
            artists(*),
            galleries(*)                    
        `)
        .range(Number(req.params.ref2), Number(req.params.ref2) + Number(limit) - 1)
        .order(field, { ascending: true });
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    if (data.length < 1) {
        const { data: dataCheck, error: errorCheck } = await supabase
            .from('paintings')
            .select(`paintingID`)
            .limit(1);
        if (errorCheck) return res.status(500).json({ error: errorCheck.message });
        if (dataCheck && dataCheck.length > 0) {
            return res.status(500).json({ error: 'Skipped more results than availible.' });
        } else {
            return res.status(500).json({ error: 'Requested results not found.' });
        }
    }
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});

app.get('/api/paintings/search/:substring', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select()
        .ilike('title', `%${req.params.substring}%`);
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});

app.get('/api/paintings/years/:start/:end', async (req, res) => {
    if (req.params.start > req.params.end) res.status(500).json({ error: 'Ending year earlier than starting year.' });
    const { data, error } = await supabase
        .from('paintings')
        .select()
        .gte('yearOfWork', req.params.start)
        .lte('yearOfWork', req.params.end)
        .order('yearOfWork', { ascending: true });
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});

app.get('/api/paintings/galleries/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select()
        .eq('galleryID', req.params.ref)
        .order('yearOfWork', { ascending: true });
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});

app.get('/api/paintings/artist/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select()
        .eq('artistID', req.params.ref)
        .order('yearOfWork', { ascending: true });
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});

app.get('/api/paintings/genre/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select(`paintingID , title, yearOfWork, paintinggenres ()`)
        .eq('paintinggenres.genreId', req.params.ref)
        .order('yearOfWork', { ascending: true });
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});

app.get('/api/paintings/era/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select(`paintingID , title, yearOfWork, 
            paintinggenres (
            genres ()
            )
        )`)
        .eq('paintinggenres.genres.eraID', req.params.ref)
        .order('yearOfWork', { ascending: true });
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    if (data.length < 1) res.status(500).json({ error: 'Requested results not found.' });
    data.slice(0, 1).forEach((d) => console.log(d));
    return res.json(data);
});