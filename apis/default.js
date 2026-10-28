const { app, supabase } = require('../app');

app.get('/', async (req, res) => {
    res.json({ default: `COMP 4513 Assignment 1 root API` });
});

app.all('*path', (req, res) => {
    res.status(500).json({ error: `Requested path ${req.originalUrl} not found.` });
});