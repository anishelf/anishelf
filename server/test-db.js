const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 15000,
    family: 4
});

async function test() {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log("SUCCESS:", result.rows);
    } catch (err) {
        console.error("FAILED:", err);
    } finally {
        await pool.end();
    }
}

test();