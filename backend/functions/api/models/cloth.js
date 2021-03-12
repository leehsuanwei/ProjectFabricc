const database = require("../database");

// Here, we are implementing the class with Singleton design pattern

class Cloth {
    constructor() {
        if (this.instance) return this.instance;
        Cloth.instance = this;
    }

    getAll() {
        return database.getAll("cloths");
    }

    get(id) {
        return database.get("cloths", id);
    }

    getFromIds(ids) {
        return database.getFromIds("cloths", ids);
    }

    create(cloth) {
        return database.create("cloths", cloth);
    }

    delete(id) {
        return database.delete("cloths", id);
    }

    update(id, cloth) {
        return database.set("cloths", id, cloth);
    }
}

module.exports = new Cloth();
