const db = require('../model/database');

class TodoService {
    async selectAll() {
        try {
            const result = await db.selectAll();
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    async selectDone() {
        try {
            const result = await db.selectDone();
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    async selectUndone() {
        try {
            const result = await db.selectUndone();
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    async insert(title, username) {
        try {
            const result = await db.addTask(title, username);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async update(id, title) {
        try {
            const result = await db.updateTask(id, title);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await db.deleteTask(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async markDone(id) {
        try {
            const result = await db.markDone(id);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async markUndone(id) {
        try {
            const result = await db.markUndone(id);
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new TodoService();
