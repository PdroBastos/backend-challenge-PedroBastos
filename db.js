const { Pool } = require('pg');


const client = new Pool({
    user: 'aula',
    host: 'localhost',
    database: 'postgres',
    password: '123',
    port: 5432,
});


module.exports = client;