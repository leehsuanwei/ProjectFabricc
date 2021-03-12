const database = require("../database");

// Here, we are implementing the class with Singleton design pattern

class Community {
    constructor() {
        if (this.instance) return this.instance;
        Community.instance = this;
    }

    getAll() {
        return database.getAll("communities");
    }

    get(id) {
        return database.get("communities", id);
    }

    getFromIds(ids) {
        return database.getFromIds("communities", ids);
    }

    create(community) {
        return database.create("communities", community);
    }

    delete(id) {
        return database.delete("communities", id);
    }

    update(id, community) {
        return database.set("communities", id, community);
    }
}

module.exports = new Community();
