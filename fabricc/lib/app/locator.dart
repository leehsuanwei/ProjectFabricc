import 'package:get_it/get_it.dart';

import '../services/theme_service.dart';
import '../services/navigation_service.dart';
import '../services/dialog_service.dart';

import '../services/rest_service.dart';
import '../../../services/authentication_service.dart';
import '../services/user/user_firestore_service.dart';
import '../services/agent/agent_firestore_service.dart';

import '../ui/views/home/home_viewmodel.dart';

final GetIt locator = GetIt.instance;

void initializeLocator() {
  // Services
  locator.registerLazySingleton(() => ThemeService());
  locator.registerLazySingleton(() => NavigationService());
  locator.registerLazySingleton(() => DialogService());

  locator.registerLazySingleton(() => RestService());
  locator.registerLazySingleton(() => AuthenticationService());
  locator.registerLazySingleton(() => UserFirestoreService());
  locator.registerLazySingleton(() => AgentFirestoreService());

  // Viewmodels
  locator.registerLazySingleton(() => HomeViewModel());
}
