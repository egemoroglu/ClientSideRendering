const {Client} = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'ClientSide',
    password: 'Gktrk06.',
    port: 5432
});

client.connect().then(function(){
    console.log('Connected to database');
}).catch(function(err){
    console.log('Error: ' + err);
});

module.exports = client;