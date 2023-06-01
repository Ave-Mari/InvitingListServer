const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'catdevil',
    host: 'localhost',
    port: 5433,
    database: 'InvitingList'
});

module.exports = pool;