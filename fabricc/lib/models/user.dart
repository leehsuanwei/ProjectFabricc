import 'dart:convert';
import 'package:cloud_firestore/cloud_firestore.dart';

class User {
  String id;
  String email;
  String username;
  String displayName;
  String phoneNumber;
  String photoUrl;
  int fiber;

  User({
    this.id,
    this.email,
    this.username,
    this.displayName,
    this.phoneNumber,
    this.photoUrl,
    this.fiber,
  });

  factory User.createNew({
    String id,
    String email,
    String username,
    String displayName,
  }) =>
      User(
        id: id,
        email: email,
        username: username,
        displayName: displayName,
        phoneNumber: '',
        photoUrl: '',
        fiber: 0,
      );

  factory User.fromSnapshot(DocumentSnapshot snapshot) {
    Map<String, dynamic> json = snapshot.data();
    json['id'] = snapshot.id;
    return User.fromJson(json);
  }

  factory User.fromRawJson(String str) => User.fromJson(jsonDecode(str));

  factory User.fromJson(Map<String, dynamic> json) => User(
        id: json['id'],
        email: json['email'],
        username: json['username'],
        displayName: json['displayName'],
        phoneNumber: json['phoneNumber'],
        photoUrl: json['photoUrl'],
        fiber: json['fiber'],
      );

  String toRawJson() => jsonEncode(toJson());

  Map<String, dynamic> toJson() => {
        'email': email,
        'username': username,
        'displayName': displayName,
        'phoneNumber': phoneNumber,
        'photoUrl': photoUrl,
        'fiber': fiber,
      };
}
