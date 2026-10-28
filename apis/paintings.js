const { app, supabase } = require('../app');

// Returns just the specified painting, e.g., /api/paintings/single/63
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

// Returns paintings sorted (lowest to highest) by either title or yearOfWork. 
// For this and the following paintings requests, The number of paintings returned is specified by ref, 
// e.g., the following returns the first 12 paintings: /api/paintings/sort/year/limit/12 
// If limit is 0, then the api returns all the paintings.
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

// Same as previous API, except, instead of returning the first paintings, skip the records specified by ref2, 
// e.g., the following returns paintings 31-40 /api/paintings/sort/year/limit/10/skip/30
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

// Returns the paintings whose title (case insensitive) contains the provided substring (sorted by year), 
// e.g., /api/paintings/search/port
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

// Returns the paintings between two years (include the paintings in the provided years), sorted by year, 
// e.g., /api/paintings/years/1800/1850
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

// Returns all the paintings in a given gallery, sorted by year, e.g., /api/paintings/galleries/5
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

// Returns all the paintings by a given artist, sorted by year, e.g., /api/paintings/artist/16
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

// Returns all the paintings for a given genre, e.g., /api/paintings/genre/78 Sorted by yearOfWork.
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

// Returns all the paintings for a given era, e.g., /api/paintings/era/2 Sorted by yearOfWork.
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