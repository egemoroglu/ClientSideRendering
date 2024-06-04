const express = require('express');
const router = express.Router();
const todoService = require('../services/TodoService.js')
const userService = require('../services/UserService.js')
const aws = require('aws-sdk');
const db = require('../model/database.js');
const path = require('path');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const s3 = new aws.S3({
    apiVersion: '2006-03-01',
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    signatureVersion: 'v4'
});

router.get('/', (req, res) => {
    const index = path.join(__dirname,'../ClientSide', 'index.html');
    res.sendFile(index);
});

router.get('/todolist', async (req, res) => {
    const username = req.query.username;
    todoService.selectAll(username, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            res.status(200).json({message: result});
        }
    }); 
});

router.get('/donelist', async (req, res) => {
    const username = req.query.username;
    todoService.selectDone(username, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            res.status(200).json({message: result});
        }
    }); 

});

router.get('/undonelist', async (req, res) => {
    const username = req.query.username;
    todoService.selectUndone(username, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            res.status(200).json({message: result});
        }
    });
});

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await userService.findUsername(username);
    if(user.length > 0) {
        res.status(500).json({ error: 'User already exists' });
    }else{
        try {
            db.addUser(username, password);
        } catch (error) {
            res.status(500).json({ error: 'User not created' });
        }
    }    
});

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log('signin', {username, password})

    try {
        const user = await userService.findUser(username, password);
        if(user.length > 0) {
            console.log(req.baseUrl)
            res.redirect(req.baseUrl + `/todoList?username=${username}`);
        } else {
            res.status(500).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'User not found' });
    }
});

router.post('/addtodo', async (req, res) => {
    const todo = req.body.todo;
    const username = req.body.username;
    todoService.insert(todo, username, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            res.status(200).json({message: result});
        }
    });
});

router.post('/deletetodo', async (req, res) => {
    const todo = req.body.todo;
    const username = req.body.username;
    todoService.delete(todo, username, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            res.status(200).json({message: result});
        }
    });
});

router.post('/updatetodo', async (req, res) => {
    const todo = req.body.todo;
    const username = req.body.username;
    todoService.update(todo, username, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            res.status(200).json({message: result});
        }
    });
});

router.post('/markdone', async (req, res) => {
    const todo = req.body.todo;
    const username = req.body.username;
    todoService.markDone(todo, username, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            res.status(200).json({message: result});
        }
    });
});

router.post('/markundone', async (req, res) => {
    const todo = req.body.todo;
    const username = req.body.username;
    todoService.markUndone(todo, username, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            res.status(200).json({message: result});
        }
    });
});

router.post('/getSignedUrl', (req, res) => {
    const { filename, filetype } = req.body;
    const bucketName = process.env.BUCKET_NAME;
    const key = `image/${filename}`;
    const region = process.env.REGION;
    const expiration = 60;

    const params = {
        Bucket: bucketName,
        Key: key,
        ContentType: filetype,
        Expires: expiration,
        
    };
    
    s3.getSignedUrl('putObject', params, (error, url) => {
        if (error) {
            console.error('Error generating pre-signed URL:', error);
            res.status(500).json({ error: 'Failed to generate pre-signed URL' });
        } else {
            const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
            res.status(200).json({ signedUrl: url, key: key, imageUrl: imageUrl});
        }
    });
});

router.get('/getObject', (req, res) => {
    const bucketName = process.env.BUCKET_NAME;
    const filename = req.query.filename;
    const key = `image/${filename}`;
    const params = {
        Bucket: bucketName,
        Key: key
    };
    s3.getObject(params, (error, data) => {
        if (error) {
            console.error('Error getting object:', error);
            res.status(500).json({ error: 'Failed to get object' });
        } else {
            // Set appropriate headers for the response
            res.set({
                'Content-Type': data.ContentType, // Set content type of the image
                'Content-Length': data.ContentLength, // Set content length
                'Content-Disposition': `attachment; filename="${filename}"` // Set filename for download
            });
            // Send the image data back to the client
            res.send(data.Body);
        }
    });
});

router.post('/deleteObject', async (req, res) => {
    const bucketName = process.env.BUCKET_NAME;
    const filename = req.body.filename;
    const key = `image/${filename}`;

    console.log('deleteObject', {key});
    const params = {
        Bucket: bucketName,
        Key: key
    };
    try {
        const data = await s3.deleteObject(params).promise();
        console.log('Deleted object', data);
        res.status(200).json({message: 'Deleted object successfully'});
    } catch (error) {
        console.error('Error deleting object', error);
        res.status(500).json({ error: 'Failed to delete object' });
    }

    
});