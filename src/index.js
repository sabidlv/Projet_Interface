import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyCImrYHsVo251bni1yRSMUjqWeoS9MXcms',
  authDomain: 'interface-581ae.firebaseapp.com',
  databaseURL: 'https://interface-581ae.firebaseio.com',
  storageBucket: 'interface-581ae.appspot.com',
};
firebase.initializeApp(config);
const database = firebase.database();
const database1 = firebase.database().ref('USER/');
const database2 = firebase.database().ref();
const query = database2.child('USER').orderByChild('user').equalTo('cc');


let data = '';
let user = ' ';

query.on('child_added', (snap) => {
  const data = snap.val();
  console.log(data);
});


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
// se loguer avec son alias
document.getElementById('btn-login-alias').addEventListener('click', () => {
  user = document.getElementById('alias').value;
});


// se faire un alias, creation
document.getElementById('btn-save-alias').addEventListener('click', () => {
  user = document.getElementById('alias').value;
  const groupe = 'WAD';
  const objUtilisateur = new ObjUser(user, groupe);
  database1.push(objUtilisateur);
  document.getElementById('alias').value = '';
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

// function pour afficher le tchat
function ajoutMessageTchat(data, user) {
  document.getElementById('container-msg').innerHTML = '';
  data.on('child_added', (snap) => {
    const mydiv = document.createElement('div');
    const enfant1 = document.createElement('p');
    const enfant = document.createElement('p');
    // enfant.classList.add('red');
    // enfant.classList.add('darken-3');
    const alias = document.createTextNode(snap.val().objmsg.user);
    console.log(snap.val());
    const text = document.createTextNode(snap.val().objmsg.msg);
    enfant1.appendChild(alias);
    enfant.appendChild(text);
    document.getElementById('container-msg').appendChild(mydiv);
    mydiv.appendChild(enfant1);
    mydiv.appendChild(enfant);
  });
}
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
                <p>Logged in as ${user.email}</p>
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
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.
    console.log('user is logged in');
    setupUI(user);
  } else {
    // User is signed out.
    console.log('user is logged out');
    setupUI();
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
