import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';
import './home_viewmodel.dart';

class HomeView extends StatelessWidget {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return ViewModelBuilder<HomeViewModel>.reactive(
      disposeViewModel: false,
      fireOnModelReadyOnce: true,
      viewModelBuilder: () => HomeViewModel(),
      onModelReady: (model) => model.fetchUser(),
      builder: (context, model, child) => Scaffold(
        key: _scaffoldKey,
        appBar: AppBar(
          backgroundColor: Colors.lightBlue[200],
          leading: Container(
            padding: const EdgeInsets.all(12.0),
            child: GestureDetector(
              onTap: () => _scaffoldKey.currentState.openDrawer(),
              child: CircleAvatar(
                backgroundColor: Colors.white54,
              ),
            ),
          ),
          title: Container(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            decoration: BoxDecoration(
              color: Colors.white54,
              shape: BoxShape.rectangle,
              borderRadius: BorderRadius.all(Radius.circular(8)),
            ),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    decoration: InputDecoration(
                      border: InputBorder.none,
                      hintText: "Search",
                      hintStyle: TextStyle(color: Colors.grey),
                      isDense: true,
                      icon: Icon(
                        Icons.search,
                        color: Colors.grey,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
        drawer: Drawer(
          child: Container(
            child: ListView(
              children: [
                Container(
                  padding: EdgeInsets.all(8),
                  child: UserAccountsDrawerHeader(
                    decoration: BoxDecoration(),
                    currentAccountPicture: GestureDetector(
                      onTap: () {
                        Navigator.pop(context);
                      },
                      child: CircleAvatar(
                        backgroundColor: Colors.lightBlue[200],
                      ),
                    ),
                    accountName: Text(
                      "${model.currentUser != null ? model.currentUser.displayName : "User"}",
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    accountEmail: Text(
                      "${model.currentUser != null ? model.currentUser.email : "email"}",
                      style: TextStyle(
                        color: Colors.grey,
                        fontSize: 18,
                      ),
                    ),
                  ),
                ),
                ListTile(
                  onTap: () {
                    Navigator.pop(context);
                  },
                  leading: Icon(Icons.shopping_cart),
                  title: Text('Cart'),
                ),
                ListTile(
                  onTap: () {
                    Navigator.pop(context);
                  },
                  leading: Icon(Icons.calendar_today),
                  title: Text('Order History'),
                ),
                ListTile(
                  onTap: () {
                    Navigator.pop(context);
                  },
                  leading: Icon(Icons.group),
                  title: Text('Charities'),
                ),
                ListTile(
                  onTap: () {
                    Navigator.pop(context);
                  },
                  leading: Icon(Icons.settings),
                  title: Text('Settings'),
                ),
              ],
            ),
          ),
        ),
        body: ListView(
          children: [
            SizedBox(height: 20),
            Card(
              margin: const EdgeInsets.symmetric(horizontal: 40, vertical: 10),
              color: Colors.lightBlue[200],
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(32.0),
              ),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                height: 80,
                width: double.maxFinite,
                child: Center(
                  child: Row(
                    children: [
                      Icon(
                        Icons.monetization_on,
                        color: Colors.white,
                        size: 36,
                      ),
                      SizedBox(width: 8),
                      Text(
                        'Fiber: ${model.currentUser != null ? model.currentUser.fiber : 0}',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            GestureDetector(
              onTap: () => model.navigateToScanner(),
              child: Card(
                margin: const EdgeInsets.all(40),
                color: Colors.green[200],
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(32.0),
                ),
                child: Container(
                  height: 200,
                  width: double.maxFinite,
                  child: Center(
                    child: Text(
                      'Scan QR',
                      style: TextStyle(fontSize: 24),
                    ),
                  ),
                ),
              ),
            ),
            GestureDetector(
              onTap: null,
              child: Card(
                margin: const EdgeInsets.all(40),
                color: Colors.amber[200],
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(32.0),
                ),
                child: Container(
                  height: 200,
                  width: double.maxFinite,
                  child: Center(
                    child: Text(
                      'Donate Cloth',
                      style: TextStyle(fontSize: 24),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
