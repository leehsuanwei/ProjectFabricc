import '../../../app/locator.dart';
import '../../../app/router.dart';

import '../../../services/navigation_service.dart';
import '../../../services/authentication_service.dart';
import '../../../models/user.dart';
import '../viewmodel.dart';

class HomeViewModel extends ViewModel {
  final NavigationService _navigationService = locator<NavigationService>();
  final AuthenticationService _authenticationService =
      locator<AuthenticationService>();

  User _currentUser;
  User get currentUser => _currentUser;

  Future fetchUser() async {
    setBusy(true);
    await _authenticationService.fetchUser();
    _currentUser = _authenticationService.currentUser;
    setBusy(false);
  }

  Future navigateToScanner() async {
    await _navigationService
        .navigateTo(ScannerViewRoute, arguments: {'user': currentUser});
    // fetchUser();
    // print(currentUser.toString());
  }
}
