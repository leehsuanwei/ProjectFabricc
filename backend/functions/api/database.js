const admin = require("firebase-admin"); // To access Firestore API

// This class is a wrapper for database connection. It centeralizes generic CRUD operations.
// Here, we are implementing the Database class with Singleton design pattern
//  Singleton is a design pattern where we create only a single instance (or object) from a class

class Database {
  constructor() {
    if (this.instance) return this.instance; // This is the key idea of implementing singleton. Return the same instance (i.e. the one that has already been created before)

    // We only proceedd to the following lines only if no instance has been created from this class
    Database.instance = this;

    // Since the functions and firestore run on the same server,
    //  we can simply use default credential.
    // However, if your app run different location, you need to create a JSON Firebase credentials

    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });

    this.firestore = admin.firestore();
  }

  // Define some helper methods for CRUD operations
  // Note that, each firestore function call is asynchronous.
  //  Thus, you want to use the 'await' keyword at the caller.

  async create(collection, document) {
    const snapshot = await this.firestore.collection(collection).add(document);
    document.id = snapshot.id;
    return document;
  }

  async getAll(collection) {
    const snapshots = await this.firestore.collection(collection).get();

    const list = [];
    snapshots.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      list.push(data);
    });
    return list.length ? list : null;
  }

  async get(collection, id) {
    const snapshot = await this.firestore.collection(collection).doc(id).get();
    if (!snapshot.exists) return null; // Record not found

    const doc = snapshot.data();
    doc.id = snapshot.id;
    return doc;
  }

  async getFromIds(collection, ids) {
    // Below function can't be use due to Firebase library error
    // const snapshots = await this.firestore.collection(collection).where(this.firestore.FieldPath.documentId(), 'in', ids).get();

    // instead, i use below function
    if(!Array.isArray(ids) || !ids.length) return null;
    const refs = ids.map(doc=> this.firestore.collection(collection).doc(doc));
    const snapshots = await this.firestore.getAll(...refs);

    const list = [];
    snapshots.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      list.push(data);
    });
    return list.length ? list : null;
  }

  async set(collection, id, document) {
    const doc = this.firestore.collection(collection).doc(id);
    const snapshot = await doc.get();

    if (!snapshot.exists) return null; // Record not found

    await doc.set(document);

    document.id = id;
    return document;
  }

  async delete(collection, id) {
    const doc = this.firestore.collection(collection).doc(id);
    const snapshot = await doc.get();

    if (!snapshot.exists) return null; // Record not found

    await doc.delete();

    return { id };
  }
}

module.exports = new Database();