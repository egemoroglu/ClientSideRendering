const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const aws = require('aws-sdk');
const routes = require('./routes/handler');

const s3 = new aws.S3({
    apiVersion: '2006-03-01',
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    signatureVersion: 'v4'
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', ejs);

app.use(express.static(path.join(__dirname, './ClientSide')));
app.use('/', routes) 


//Server listening on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
