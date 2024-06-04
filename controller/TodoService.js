const db = require('../model/database');

class TodoService {
    async selectAll(username) {
        return new Promise((resolve, reject) => {
            db.selectAll(username, function(err, result) {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async selectDone(username) {
        return new Promise((resolve, reject) => {
            db.selectDone(username, function(err, result) {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async selectUndone(username) {
        return new Promise((resolve, reject) => {
            db.selectUndone(username, function(err, result) {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async insert(title, username) {
        return new Promise((resolve, reject) => {
            db.addTask(title, username, function(err, result) {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async update(id, title) {
        return new Promise((resolve, reject) => {
            db.updateTask(id, title, function(err, result) {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            db.deleteTask(id, function(err, result) {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async markDone(id) {
        return new Promise((resolve, reject) => {
            db.markDone(id, function(err, result) {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async markUndone(id) {
        return new Promise((resolve, reject) => {
            db.markUndone(id, function(err, result) {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = new TodoService();