const db = require('../model/database');

class UserService {

    //add user function that calls the addUser function in the database
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

    //find user function that calls the findUser function in the database
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

    //find username function that calls the findUsername function in the database
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