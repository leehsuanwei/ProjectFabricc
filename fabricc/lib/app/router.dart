import 'package:flutter/material.dart';
import 'route_transitions.dart';

import '../ui/views/home/home_view.dart';
import '../ui/views/scanner/scanner_view.dart';
import '../ui/views/scanner/scanner_success_view.dart';

const String HomeViewRoute = '/';
const String ScannerViewRoute = '/scanner';
const String ScannerSuccessViewRoute = '/scanner_success';

Route<dynamic> generateRoute(RouteSettings settings) {
  switch (settings.name) {
    case HomeViewRoute:
      return ScaleRoute(page: HomeView());
    case ScannerViewRoute:
      var user = (settings.arguments as Map)['user'];
      return ScaleRoute(page: ScannerView(user: user));
    case ScannerSuccessViewRoute:
      return SlideLeftRoute(page: ScannerSuccessView());
    // case UserViewRoute:
    //   var user = (settings.arguments as Map)['user'];
    //   return SlideLeftRoute(page: UserView(user: user));

  }
  return null;
}
