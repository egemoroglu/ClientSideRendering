const connection = require('./connection.js');

const database = {

    //Select All Tasks
    selectAll: function(username, callback){
        connection.query('SELECT * FROM task WHERE assignee = $1', [username] , function(err, res) {
            if(err){
                console.log(err);
                console.log("Tasks not found");
                callback(err, null);
            }
            callback(null, res.rows);
        });
    },

    //Select Done Tasks
    selectDone: function(username, callback){
        connection.query('SELECT * FROM task WHERE done = true AND assignee = $1', [username], function(err, res){
            if(err){
                console.log(err);
                console.log("Tasks not found");
                callback(err, null);
            }
            callback(null, res.rows);
        });
    },

    //Select Undone Tasks
    selectUndone: function(username, callback){
        connection.query('SELECT * FROM task WHERE done = false AND assignee = $1 ',[username], function(err, res){
            if(err){
                console.log(err);
                console.log("Tasks not found");
                callback(err, null);
            }
            callback(null, res.rows);
        });
    },

    //Insert Tasks
    addTask: function(title, assignee){
        const query = ("INSERT INTO Task (title, assignee, done) VALUES ($1, $2, $3)")
        const values = [title, assignee, false];
        connection.query(query, values, (err, res) => {
            if(err) {
                console.log(err);
                console.log("Error while adding the Task");
            }else{
                console.log("Task added successfully");
            } 
        });
        
    },

    //Update Task
    updateTask: function(id, title){
        const query = ("UPDATE task SET title = $1 WHERE id = $2");
        const values = [title, id];
        connection.query(query, values, (err, res) => {
            if(err){
                console.log(err);
                console.log("Error while updating the Task");
            }
            console.log("Task updated successfully");
        });
    },

    //Delete Task
    deleteTask: function(id, cb){
        connection.query('DELETE FROM task WHERE id = $1', [id], (err, res) => {
            if(err) {
                console.log(err);
                console.log("Error while deleting the Task");
            }
            console.log("Task deleted successfully");
            
        });
    },

    findUser: function(username, password){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password], (err, res) => {
                if(err) reject(err);
                resolve(res.rows);
            });
        });
        
    },
    findUsername: function(username){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE username = $1', [username], (err, res) => {
                if(err) reject(err);
                resolve(res.rows);
            });
        });
    },
    addUser: function(username, password){
        const query = ("INSERT INTO users (username, password) VALUES ($1, $2)");
        const values = [username, password];
        connection.query(query, values, (err, res) => {
            if(err){
                console.log(err);
                console.log("Error while adding the user");
            }
            console.log("User added successfully");
            
        });
    },
    markDone: function(id, cb){
        connection.query('UPDATE task SET done = true WHERE id = $1', [id], (err, res) => {
            if(err) cb(err, null);
            cb(null, res);
        
        });
            
        
    },
    
    markUndone: function(id, callback){
        connection.query("UPDATE task SET done = false WHERE id = $1", [id], function(err, res) {
            if(err) callback(err, null);
            callback(null, res);
        });
    }
};

module.exports = database;