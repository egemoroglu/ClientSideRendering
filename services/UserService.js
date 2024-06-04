const db = require('../model/database');

class UserService {

    async addUser(username, password) {
        return new Promise((resolve, reject) => {
            db.addUser(username, password, function(err, result) {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async findUser(username, password) {
        return new Promise((resolve, reject) => {
            db.findUser(username, password, function(err, result) {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async findUsername(username) {
        return new Promise((resolve, reject) => {
            db.findUsername(username, function(err, result) {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
    

}

module.exports = new UserService();