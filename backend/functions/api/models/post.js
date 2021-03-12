const database = require("../database");

// Here, we are implementing the class with Singleton design pattern

class Post {
    constructor() {
        if (this.instance) return this.instance;
        Post.instance = this;
    }

    getAll() {
        return database.getAll("posts");
    }

    get(id) {
        return database.get("posts", id);
    }

    getFromIds(ids) {
        return database.getFromIds("posts", ids);
    }

    create(post) {
        return database.create("posts", post);
    }

    delete(id) {
        return database.delete("posts", id);
    }

    update(id, post) {
        return database.set("posts", id, post);
    }
}

module.exports = new Post();
