const database = require("../database");

// Here, we are implementing the class with Singleton design pattern

class Token {
    constructor() {
        if (this.instance) return this.instance;
        Token.instance = this;
    }

    getAll() {
        return database.getAll("tokens");
    }

    get(id) {
        return database.get("tokens", id);
    }

    getFromIds(ids) {
        return database.getFromIds("tokens", ids);
    }

    create(token) {
        return database.create("tokens", token);
    }

    delete(id) {
        return database.delete("tokens", id);
    }

    update(id, token) {
        return database.set("tokens", id, token);
    }
}

module.exports = new Token();
