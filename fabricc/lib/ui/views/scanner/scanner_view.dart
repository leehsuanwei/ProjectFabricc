import 'dart:io';
import 'package:flutter/material.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';

import '../../../app/router.dart';
import '../../../app/locator.dart';
import '../../../services/navigation_service.dart';
import '../../../services/dialog_service.dart';
import '../../../services/agent/agent_firestore_service.dart';
import '../../../services/user/user_firestore_service.dart';
import '../../../models/user.dart';
import '../../../models/agent.dart';

class ScannerView extends StatefulWidget {
  final User user;

  ScannerView({@required this.user});

  @override
  _ScannerViewState createState() => _ScannerViewState();
}

class _ScannerViewState extends State<ScannerView> {
  Barcode result;
  String prevCode = '';
  QRViewController controller;
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');

  final NavigationService _navigationService = locator<NavigationService>();
  final DialogService _dialogService = locator<DialogService>();
  final UserFirestoreService _userFirestoreService =
      locator<UserFirestoreService>();
  final AgentFirestoreService _agentFirestoreService =
      locator<AgentFirestoreService>();

  // In order to get hot reload to work we need to pause the camera if the platform
  // is android, or resume the camera if the platform is iOS.
  @override
  void reassemble() {
    super.reassemble();
    if (Platform.isAndroid) {
      controller.pauseCamera();
    }
    controller.resumeCamera();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _buildQrView(context),
    );
  }

  Widget _buildQrView(BuildContext context) {
    // For this example we check how width or tall the device is and change the scanArea and overlay accordingly.
    var scanArea = (MediaQuery.of(context).size.width < 400 ||
            MediaQuery.of(context).size.height < 400)
        ? 150.0
        : 300.0;
    // To ensure the Scanner view is properly sizes after rotation
    // we need to listen for Flutter SizeChanged notification and update controller
    return QRView(
      key: qrKey,
      onQRViewCreated: _onQRViewCreated,
      overlay: QrScannerOverlayShape(
          borderColor: Colors.red,
          borderRadius: 10,
          borderLength: 30,
          borderWidth: 10,
          cutOutSize: scanArea),
    );
  }

  void _onQRViewCreated(QRViewController controller) {
    this.controller = controller;
    controller.scannedDataStream.listen((scanData) async {
      result = scanData;
      if (result != null) {
        if (result.code != prevCode) {
          prevCode = result.code;
          final agent = await _agentFirestoreService.getAgent(result.code);
          if (agent is Agent) {
            agent.currentUser = 'NnmYVVRtUDjHmeXBink9';
            await _agentFirestoreService.updateAgent(agent);
            await _navigationService
                .navigateReplacementTo(ScannerSuccessViewRoute);
            final tempUser = widget.user;
            tempUser.fiber += 10;
            await _userFirestoreService.updateUser(tempUser);
          } else {
            await _dialogService.showDialog(
              title: 'QR Failed',
              description: 'The QR Code is invalid',
            );
            // prevCode = '';
          }
        }
      }
    });
  }

  @override
  void dispose() {
    controller?.dispose();
    super.dispose();
  }
}
