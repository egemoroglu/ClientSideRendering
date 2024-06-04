const {Client} = require('pg');

const client = new Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: 5432
});

client.connect().then(function(){
    console.log('Connected to database');
}).catch(function(err){
    console.log('Error: ' + err);
});

module.exports = client;