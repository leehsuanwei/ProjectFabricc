import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';

import '../../app/locator.dart';
import '../../services/theme_service.dart';

class ViewModel extends BaseViewModel {
  final ThemeService _themeService = locator<ThemeService>();

  bool get darkMode => _themeService.darkMode;
  Brightness get brightness => _themeService.brightness;

}
