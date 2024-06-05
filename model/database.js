const connection = require('./connection');

const database = {
    // Select All Items
    selectAll: function() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM todo", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Select Undone Items
    selectUndone: function() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM todo WHERE done = false", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Select Done Items
    selectDone: function() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM todo WHERE done = true", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Add Task
    addTask: function(title, assignee) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO todo (title, assignee, done) VALUES ($1, $2, $3)";
            const values = [title, assignee, false];
            connection.query(query, values, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Update Task
    updateTask: function(id, title) {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE todo SET title = $1 WHERE id = $2", [title, id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Delete Task
    deleteTask: function(id) {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM todo WHERE id = $1', [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Mark Undone Task as Done
    markDone: function(id) {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE todo SET done = true WHERE id = $1", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Mark Done Task as Undone
    markUndone: function(id) {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE todo SET done = false WHERE id = $1", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Add User
    addUser: function(username, password) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users (username, password) VALUES ($1, $2)";
            const values = [username, password];
            connection.query(query, values, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Find User
    findUser: function(username, password) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE username = $1 AND password = $2";
            const values = [username, password];
            connection.query(query, values, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    },

    // Find Username
    findUsername: function(username) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE username = $1";
            connection.query(query, [username], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }
};

module.exports = database;
