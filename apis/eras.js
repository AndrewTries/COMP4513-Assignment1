const { app, supabase } = require('../app');

app.get('/api/eras', async (req, res) => {
    const { data, error } = await supabase
        .from('eras')
        .select();
    if (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: error.message });
    }
    data.slice(0, 1).forEach((d) => console.log(d));
    res.json(data);
});