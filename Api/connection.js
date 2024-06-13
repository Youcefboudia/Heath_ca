const { Pool } = require('pg');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;


const pool = new Pool({
  host: 'localhost',
  database: 'healthcare',
  user: 'postgres',
  password: 'rB2j',
  port: 5432,
});
pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Connected to the database');
    done();
  }
});



module.exports = pool;
