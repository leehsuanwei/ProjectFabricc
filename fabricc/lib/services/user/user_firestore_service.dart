import 'package:cloud_firestore/cloud_firestore.dart';
import '../../models/user.dart';

class UserFirestoreService {
  final CollectionReference _usersRef =
      FirebaseFirestore.instance.collection('users');

  Future<User> getUser(String id) async {
    DocumentSnapshot snapshot = await _usersRef.doc(id).get();
    if (snapshot.exists) return User.fromSnapshot(snapshot);
    return null;
  }

  Future createUser(User user) async {
    return _usersRef.doc(user.id).set(user.toJson());
  }

  Future updateUser(User user) async {
    return _usersRef.doc(user.id).update(user.toJson());
  }

  Future deleteUser(String id) async {
    await _usersRef.doc(id).delete();
  }
}
