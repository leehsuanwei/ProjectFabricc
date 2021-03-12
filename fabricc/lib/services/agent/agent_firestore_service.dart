import 'package:cloud_firestore/cloud_firestore.dart';
import '../../models/agent.dart';

class AgentFirestoreService {
  final CollectionReference _agentsRef =
      FirebaseFirestore.instance.collection('agents');

  Future getAgent(String id) async {
    DocumentSnapshot snapshot = await _agentsRef.doc(id).get();
    if (snapshot.exists) return Agent.fromSnapshot(snapshot);
    return null;
  }

  Future createAgent(Agent agent) async {
    return _agentsRef.add(agent.toJson());
  }

  Future updateAgent(Agent agent) async {
    return _agentsRef.doc(agent.id).update(agent.toJson());
  }

  Future deleteAgent(String id) async {
    await _agentsRef.doc(id).delete();
  }
}
