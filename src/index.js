
import config from './config';
import * as firebase from 'firebase/app';
import 'firebase/database';
firebase.initializeApp(config);


  var config = {
    apiKey: "AIzaSyCImrYHsVo251bni1yRSMUjqWeoS9MXcms",
    authDomain: "interface-581ae.firebaseapp.com",
    databaseURL: "https://interface-581ae.firebaseio.com",
    storageBucket: "interface-581ae.appspot.com"
  };

  // Get a reference to the database service
  var database = firebase.database().ref();

