const express = require('express');
const supa = require('@supabase/supabase-js');
const process = require('node:process');

const fs = require('fs');

if (fs.existsSync('.env')) {
    process.loadEnvFile();
}

const app = express();
const supaUrl = process.env.SUPABASE_URL;
const supaPubKey = process.env.SUPABASE_PUBLISHABLE_KEY;
const port = process.env.PORT;
const supabase = supa.createClient(supaUrl, supaPubKey);

module.exports = { app, supabase };

require('./apis/eras');
require('./apis/artists');
require('./apis/galleries');
require('./apis/genres');
require('./apis/paintings');

app.listen(port, (err) => {
    if (err) {
        if (err.code === 'EADDRINUSE') {
            console.error(`Port ${PORT} is already in use.`);
        } else {
            console.error('Server failed to start:', err);
        }
        process.exit(1);
    }
    console.log(supaUrl);
    console.log(`listening on port ${port}`);
});