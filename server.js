const dotenv = require('dotenv')
dotenv.config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const aws = require('aws-sdk');
const { S3Client, S3 } = require('@aws-sdk/client-s3');
const {DeleteObjectCommand} = require('@aws-sdk/client-s3');
const db = require('./config/database.js');

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

//Render the one and only index.html file
app.get('/', (req, res) => {
    const index = path.join(__dirname,'./ClientSide', 'index.html');
    res.sendFile(index);
});
//GET todoList is called when the user logs in
app.get('/todoList', (req, res) => {
    const username = req.query.username;
    console.log("todoList", username);
    db.selectAll(username, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            console.log('Inside todoList the Data: ', result);
            res.status(200).json({message: result});
        }
    }); 
});
//GET doneList is called when the user clicks on the doneList button
app.get('/doneList', (req, res) => {
    const username = req.query.username;
    console.log("doneList", username);
    db.selectDone(username, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            console.log('Inside doneList the Data: ', result);
            res.status(200).json({message: result});
        }
    }); 

});
//GET undoneList is called when the user clicks on the undoneList button
app.get('/undoneList', (req, res) => {
    const username = req.query.username;
    db.selectUndone(username, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            console.log('Inside undoneList the Data: ', result);
            res.status(200).json({message: result});
        }
    }); 
});
//POST api to the server to add a task
app.post('/addTask', (req, res) => {
    const title = req.body.title;
    const username = req.query.username;
    console.log('addTask', {title, username});
    try {
        db.addTask(title, username);
        res.redirect(req.baseUrl +`/todoList?username=${username}`);
    } catch (error) {
        res.status(500).json({ error: 'Task not created' });
    }
});
//POST api to the server to sign up a user
app.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await db.findUsername(username);
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

//POST api to the server to sign in a user
app.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log('signin', {username, password})

    try {
        const user = await db.findUser(username, password);
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
//POST api to the server to update a task
app.post('/update', async (req, res) => {
    const id = req.query.id;
    const title = req.body.title;
    console.log('update', {id, title});
    db.updateTask(id, title, function (err, result) {
        if(err) {
            console.log(err);
        } else {
            console.log('Inside update the Data: ', result);
            res.status(200).json({result});
        }
    });
});
//GET api to the server to delete a task
app.post('/delete', async (req, res) => {
    const id = req.query.id;
    console.log('delete', id);
    if(id) {
        try {
            db.deleteTask(id);
            res.status(200).json({message: 'Task deleted successfully'});
        } catch (error) {
            res.status(500).json({ error: 'Task not deleted' });
        }
    } else {
        res.status(500).json({ error: 'Task not deleted' });
    }
});

//POST api to the server to mark a task as done
app.post('/markDone', async (req, res) => {
    const id = req.query.id;
    console.log('markDone', id);
    if(id) {
        try {
            db.markDone(id, function (err, result) {
            
                if(err) {
                    console.log(err);
                } else {
                    console.log('Inside markDone the Data: ', result);
                    res.status(200).json({message: result});
                
                }
                
            });
        } catch (error) {
            res.status(500).json({ error: 'Task not marked done' });
        }
    }
});
//POST api to the server to mark a task as undone
app.post('/markUndone', async (req, res) => {
    const id = req.query.id;
    console.log('markUndone', id);
    db.markUndone(id, function (err, result) {
        if(err) {
            console.log(err);
        } else {
            console.log('Inside markUndone the Data: ', result);
            res.status(200).json({message: result});
        }
       
    });

});

app.post('/getSignedUrl', (req, res) => {
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

app.get('/getObject', (req, res) => {
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


//Delete object from the bucket
app.post('/deleteObject', async (req, res) => {
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


//Server listening on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
