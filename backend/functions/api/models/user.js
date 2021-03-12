const database = require("../database");

// Here, we are implementing the class with Singleton design pattern

class User {
    constructor() {
        if (this.instance) return this.instance;
        User.instance = this;
    }

    getAll() {
        return database.getAll("users");
    }

    get(id) {
        return database.get("users", id);
    }

    getFromIds(ids) {
        return database.getFromIds("users", ids);
    }

    create(user) {
        return database.create("users", user);
    }

    delete(id) {
        return database.delete("users", id);
    }

    update(id, user) {
        return database.set("users", id, user);
    }
}

module.exports = new User();
