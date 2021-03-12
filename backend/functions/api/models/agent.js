const database = require("../database");

// Here, we are implementing the class with Singleton design pattern

class Agent {
    constructor() {
        if (this.instance) return this.instance;
        Agent.instance = this;
    }

    getAll() {
        return database.getAll("agents");
    }

    get(id) {
        return database.get("agents", id);
    }

    getFromIds(ids) {
        return database.getFromIds("agents", ids);
    }

    create(agent) {
        return database.create("agents", agent);
    }

    delete(id) {
        return database.delete("agents", id);
    }

    update(id, agent) {
        return database.set("agents", id, agent);
    }
}

module.exports = new Agent();
