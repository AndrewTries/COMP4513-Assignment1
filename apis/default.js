const { app, supabase } = require('../app');

// default route
app.get('/', async (req, res) => {
    res.json({ default: `COMP 4513 Assignment 1 root API` });
});

// This route accepts all invalid routes and returns an invalid path error
app.all('*path', (req, res) => {
    res.status(500).json({ error: `Requested path ${req.originalUrl} not found.` });
});