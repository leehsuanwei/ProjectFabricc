const database = require("../database");

// Here, we are implementing the class with Singleton design pattern

class Comment {
    constructor() {
        if (this.instance) return this.instance;
        Comment.instance = this;
    }

    getAll() {
        return database.getAll("comments");
    }

    get(id) {
        return database.get("comments", id);
    }

    getFromIds(ids) {
        return database.getFromIds("comments", ids);
    }

    create(comment) {
        return database.create("comments", comment);
    }

    delete(id) {
        return database.delete("comments", id);
    }

    update(id, comment) {
        return database.set("comments", id, comment);
    }
}

module.exports = new Comment();
