import 'dart:convert';
import 'package:cloud_firestore/cloud_firestore.dart';

class Agent {
  String id;
  String currentUser;

  Agent({
    this.id,
    this.currentUser,
  });

  factory Agent.createNew({
    String id,
    String currentUser,
  }) =>
      Agent(
        id: id,
        currentUser: currentUser,
      );

  factory Agent.fromSnapshot(DocumentSnapshot snapshot) {
    Map<String, dynamic> json = snapshot.data();
    json['id'] = snapshot.id;
    return Agent.fromJson(json);
  }

  factory Agent.fromRawJson(String str) =>
      Agent.fromJson(jsonDecode(str));

  factory Agent.fromJson(Map<String, dynamic> json) => Agent(
        id: json['id'],
        currentUser: json['currentUser'],
      );

  String toRawJson() => jsonEncode(toJson());

  Map<String, dynamic> toJson() => {
        'currentUser': currentUser,
      };
}
