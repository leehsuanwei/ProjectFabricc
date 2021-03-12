import '../../../app/locator.dart';
import '../../../services/user/user_firestore_service.dart';
import '../../../models/user.dart';

class AuthenticationService {
  final UserFirestoreService _userFirestoreService =
      locator<UserFirestoreService>();

  User _currentUser;
  User get currentUser => _currentUser;

  Future fetchUser() async {
    _currentUser = await _userFirestoreService.getUser('hwX73X5buXRsuzNwoTWz');
  }
}
