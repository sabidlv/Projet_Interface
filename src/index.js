<<<<<<< HEAD
import config from './config';
import * as firebase from 'firebase/app';
import 'firebase/database';
firebase.initializeApp(config);
=======

  import * as firebase from 'firebase/app';
  import 'firebase/database';  

  var config = {
    apiKey: "AIzaSyCImrYHsVo251bni1yRSMUjqWeoS9MXcms",
    authDomain: "interface-581ae.firebaseapp.com",
    databaseURL: "https://interface-581ae.firebaseio.com",
    storageBucket: "interface-581ae.appspot.com"
  };
 
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database().ref();
>>>>>>> bc5decc514b83ae59fd6ff99e0350cc82b43e17c
