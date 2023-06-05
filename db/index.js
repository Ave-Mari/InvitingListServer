const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
});

pool.connect((err) => {
    if (err) {
        console.error('Error: ', err.message)
    } else {
        console.log("Connect to PostgreSQL successfully!")
    }
    
})

module.exports = pool;