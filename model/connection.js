const { Client } = require('pg');
class DatabaseConnection {
    constructor() {
        this.client = new Client({
            user: process.env.DATABASE_USER,
            host: process.env.DATABASE_HOST,
            database: process.env.DATABASE_NAME,
            password: process.env.DATABASE_PASSWORD,
            port: 5432,
            ssl: {
                rejectUnauthorized: false
            }
        });

        this.client.connect()
            .then(() => console.log('Connected to database'))
            .catch((err) => console.log('Error: ' + err));
    }

    getClient() {
        return this.client;
    }
}

module.exports = new DatabaseConnection().getClient();
