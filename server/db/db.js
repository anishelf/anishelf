const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,

    ssl: {
        rejectUnauthorized: false
    },

    connectionTimeoutMillis: 15000,

    // Force IPv4
    family: 4
});

module.exports = pool;