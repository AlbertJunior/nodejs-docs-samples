// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START gae_flex_quickstart]
const express = require('express');

const app = express();
const port = 9100;

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

app.set('views', __dirname +'/views');
app.set('view engine', 'ejs')



// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");


var firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://PROJECT_ID.firebaseio.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "G-MEASUREMENT_ID",
};



function authStateObserver(user) {
    console.log("WOdewW");
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initiate Firebase Auth.
function initFirebaseAuth(callback) {
  // Listen to auth state changes.
  firebase.auth().onAuthStateChanged(authStateObserver);
  callback();
}




app.get('/', (req, res) => {
  // initFirebaseAuth();
  initFirebaseAuth(()=>{
    signIn() ;
  })
  res.render('index', {title: "Beautiful title"});
  // res.status(200).send('Hello!').end();
});

app.get('/signin', (req, res) => {
  initFirebaseAuth(()=>{
    signIn() ;
  })
  res.render('index', {title: "Beautiful title"});
  // res.status(200).send('Hello!').end();
});


function signIn() {
  // Sign into Firebase using popup auth & Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  console.log(provider);

  firebase.auth().signInWithPopup(provider);

  console.log(firebase.auth().currentUser.displayName);
  // firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(AIzaSyADHUvrwbwqSan1ReQkD1mw-btvyAS4gGU))
  // firebase.auth().signInWithPopup(provider).then((result) => {
  //   console.log("CEVA1");
  // }, (error) => {
  //   console.log(error);

  // });
  // firebase.auth().signInWithPopup(provider);
}


// Start the server
const PORT = process.env.PORT || port;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_flex_quickstart]

module.exports = app;

