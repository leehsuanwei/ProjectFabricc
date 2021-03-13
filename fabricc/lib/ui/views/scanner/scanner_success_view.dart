import 'package:flutter/material.dart';
import '../../../app/locator.dart';
import '../../../services/authentication_service.dart';

class ScannerSuccessView extends StatelessWidget {
  final AuthenticationService _authenticationService =
      locator<AuthenticationService>();

  @override
  Widget build(BuildContext context) {
    _authenticationService.fetchUser();
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.lightBlue[200],
        title: Text('QR Scan Succesful'),
      ),
      body: Center(
        child: Card(
          margin: const EdgeInsets.all(40),
          color: Colors.lightBlue[200],
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(32.0),
          ),
          child: Container(
            padding: const EdgeInsets.all(40),
            height: 400,
            width: double.maxFinite,
            child: Center(
              child: Text(
                'Thank you for submitting your cloth. You will be rewarded after the processing is done',
                style: TextStyle(fontSize: 24),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
