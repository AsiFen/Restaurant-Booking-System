import pgPromise from 'pg-promise';
import dotenv from 'dotenv';
dotenv.config();

const connectPromise = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
};

const db = pgPromise()(connectPromise);

db.connect();
//export the database
export default db;
