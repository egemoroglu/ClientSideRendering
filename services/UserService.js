const db = require('../model/database');

class UserService {

    async addUser(username, password) {
        try {
            const result = await db.addUser(username, password);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async findUser(username, password) {
        try {
            const result = await db.findUser(username, password);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async findUsername(username) {
        try {
            const result = await db.findUsername(username);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService();
