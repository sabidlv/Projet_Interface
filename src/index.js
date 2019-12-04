// import firebase and services
import $ from 'jquery';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { config } from './app/config';// import config of the database
// import function
import { pathTable } from './app/helpers/connectTable';
import { getMessage } from './app/helpers/getMessagesTable';
import { queryGroup } from './app/helpers/groupUser';
import { pushMessage } from './app/helpers/pushMessageTable';
import { pushUser } from './app/helpers/pushUser';

// initialize firebase
firebase.initializeApp(config);
let user = '';
let data = '';
document.addEventListener('DOMContentLoaded', () => {
  console.log('the html is ready');
});
// Login with the alias
document.getElementById('btn-login-alias').addEventListener('click', () => {
  const userLogin = document.getElementById('alias-login').value;
  const database = pathTable('USER/'); // connect to USER table
  queryGroup(database, userLogin);
  user = userLogin; // display the matching tchat group
});

// Create an alias
document.getElementById('btn-save-alias').addEventListener('click', () => {
  const createUser = document.getElementById('alias').value;
  const database = pathTable('USER/');
  user = pushUser(database, createUser);
  queryGroup(database, user); // display the matching tchat group
  user = createUser;
});

// Display messages from the right table
document.getElementById('game').addEventListener('click', () => {
  data = pathTable('GAME/'); // se connecter à la table GAME
  getMessage(data);
});
document.getElementById('web').addEventListener('click', () => {
  data = pathTable('WEB/'); // se connecter à la table WEB
  getMessage(data);
});

document.getElementById('general').addEventListener('click', () => {
  data = pathTable('GENERAL/'); // se connecter à la table GENERAL
  getMessage(data);
});
document.getElementById('wad').addEventListener('click', () => {
  data = pathTable('WAD/'); // se connecter à la table WAD
  getMessage(data);
});
// click pour pusher un message dans le Tchat
document.getElementById('btn-envoie').addEventListener('click', (event) => {
  event.preventDefault();
  pushMessage(data, user);
});


/* ----------- MODAL MATERIALIZE ----------*/
document.addEventListener('DOMContentLoaded', () => {
  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
});

/* ----------- BUTTON RADIO ----------*/
const contenu = document.querySelector('.contenu');
/* const game = document.querySelector('#game').value;
const wad = document.querySelector('#wad').value;
const web = document.querySelector('#web').value; */

const lesradios = document.getElementsByName('');

/* ----------- MENU CONDITIONEL ----------*/
const logoutLinks = document.querySelectorAll('.logged-out');
const loginLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

$("input[type='radio']").click(() => {
  if ($('input[name="group1"]').is(':checked')) {
    const nameGroup = $('input[name="group1"]:checked').val();
  }
});


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
      (error) => console.log(err.message);
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
