
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { ajoutMessageTchat } from './app/helpers';

const config = {
  apiKey: 'AIzaSyCImrYHsVo251bni1yRSMUjqWeoS9MXcms',
  authDomain: 'interface-581ae.firebaseapp.com',
  databaseURL: 'https://interface-581ae.firebaseio.com',
  storageBucket: 'interface-581ae.appspot.com',
};
class ObjMessage {
  constructor(user, msg) {
    this.user = user;
    this.msg = msg;
  }
}
class ObjUser {
  constructor(user, groupe) {
    this.user = user;
    this.groupe = groupe;
  }
}
let data = '';
let user = ' ';

firebase.initializeApp(config);
const database = firebase.database();
const database1 = firebase.database().ref('USER/');
const database2 = firebase.database().ref();
const query = database2.child('USER').orderByChild('user');// .equalTo('value');

query.on('child_added', (snap) => {
  const data = snap.val();
  console.log(data);
});

// se loguer avec son alias
document.getElementById('btn-login-alias').addEventListener('click', () => {
  user = document.getElementById('alias').value;

  query.once('value', (snapshot) => {
    console.log(snapshot.val());
    snapshot.forEach((snap) => {
      if (snap.val().user === user) {
        console.log(snap.val().groupe);
        document.getElementById(snap.val().groupe).setAttribute('style', 'visibility: visible;');
        document.getElementById('label-alias').setAttribute('style', 'visibility: hidden;');
        document.getElementById('alias').setAttribute('style', 'visibility: hidden;');
      }
    });
  });
});

// se faire un alias, creation
document.getElementById('btn-save-alias').addEventListener('click', () => {
  user = document.getElementById('alias').value;

  const groupe = document.getElementById('alias-groupe').value;
  const objUtilisateur = new ObjUser(user, groupe);
  database1.push(objUtilisateur);
  document.getElementById('alias').value = '';
  document.getElementById('alias-groupe').value = '';
});

// tchat
document.getElementById('game').addEventListener('click', () => {
  data = database.ref('GAME/');
  ajoutMessageTchat(data, user);
});
document.getElementById('web').addEventListener('click', () => {
  data = database.ref('WEB/');
  ajoutMessageTchat(data, user);
});
document.getElementById('general').addEventListener('click', () => {
  data = database.ref('GENERAL/');
  ajoutMessageTchat(data, user);
});
document.getElementById('wad').addEventListener('click', () => {
  data = database.ref('WAD/');
  ajoutMessageTchat(data, user);
});


// pusher un post
const mybtn = document.getElementById('btn-envoie');
mybtn.addEventListener('click', (event) => {
  event.preventDefault();
  const msg = document.getElementById('msg').value;
  const objmsg = new ObjMessage(user, msg);
  data.push({ objmsg });
  document.getElementById('msg').value = '';
  document.getElementById('msg').focus();
});


/* ----------- MODAL MATERIALIZE ----------*/
document.addEventListener('DOMContentLoaded', () => {
  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
});

/* ----------- BUTTON RADIO ----------*/
const contenu = document.querySelector('.contenu');
const game = document.querySelector('#game').value;
const wad = document.querySelector('#wad').value;
const web = document.querySelector('#web').value;

/* ----------- MENU CONDITIONEL ----------*/
const logoutLinks = document.querySelectorAll('.logged-out');
const loginLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if (user) {
    // info profil
    const html = `
            <div>
                Logged in as ${user.email}
            </div>
        `;
    accountDetails.innerHTML = html;

    loginLinks.forEach((item) => item.style.display = 'block');
    logoutLinks.forEach((item) => item.style.display = 'none');
  } else {
    // cacher info profil
    accountDetails.innerHTML = '';

    logoutLinks.forEach((item) => item.style.display = 'block');
    loginLinks.forEach((item) => item.style.display = 'none');
  }
};

/* ----------------------- AUTHENTIFICATION FIREBASE ------------------------*/
const auth = firebase.auth();
// const db = firebase.firestore();

// ---------- QUAND LE STATUS CHANGE
const loginContent = document.querySelector('.login-content');
const plsLogin = document.querySelector('.plsLogin');

auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    console.log('user is logged in');
    setupUI(user);
    loginContent.style.display = 'block';
    plsLogin.style.display = 'none';
  } else {
    // User is signed out.
    console.log('user is logged out');
    setupUI();
    loginContent.style.display = 'none';
    plsLogin.style.display = 'block';
  }
});

// -------------- SIGN UP
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#signup-email').value;
  const password = document.querySelector('#signup-password').value;
  // alias

  auth.createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
    .catch((error) => {
      // Handle Errors here.
      (err) => console.log(err.message);
    });
});

// -------------- LOGOUT
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// --------------- LOGIN
const login = document.querySelector('#login-form');
login.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;
  auth.signInWithEmailAndPassword(email, password)
    .then((cred) => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      login.reset();
    })
    .catch((error) => {
      // Handle Errors here.
      (err) => console.log(err.message);
    });
});
