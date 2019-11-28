

  import * as firebase from 'firebase/app';
  import 'firebase/database';  


  var config = {
    apiKey: "AIzaSyCImrYHsVo251bni1yRSMUjqWeoS9MXcms",
    authDomain: "interface-581ae.firebaseapp.com",
    databaseURL: "https://interface-581ae.firebaseio.com",
    storageBucket: "interface-581ae.appspot.com"
  };

 
firebase.initializeApp(config);
var database = firebase.database();//.ref('WAD/');
let data = "";

document.getElementById('game').addEventListener('click',()=>{
  console.log('les GAME');
 document.getElementById('container-msg').innerHTML="";
  data = database.ref('GAME/');
  data.on('child_added', function(snap){
    //console.log('les valeurs'+snap.val());
  let enfant= document.createElement('p');
  console.log(snap.val());
  let text = document.createTextNode(snap.val().msg);
  enfant.appendChild(text);
  document.getElementById('container-msg').appendChild(enfant);
  });
});

document.getElementById('web').addEventListener('click',()=>{
  document.getElementById('container-msg').innerHTML="";
   data = database.ref('WEB/');
  data.on('child_added', function(snap){
    //console.log('les valeurs'+snap.val());
  let enfant= document.createElement('p');
  console.log(snap.val());
  let text = document.createTextNode(snap.val().msg);
  enfant.appendChild(text);
  document.getElementById('container-msg').appendChild(enfant);
  });
});

//pusher un post
let mybtn = document.getElementById('btn-envoie');
mybtn.addEventListener('click', function(event){
    event.preventDefault();
    let msg = document.getElementById('msg').value;
    console.log('message '+ msg);
    data.push({msg});
    document.getElementById('msg').value='';
    document.getElementById('msg').focus();
 
});
//user:
let database1 = firebase.database().ref('USER/');
let btnUser = document.getElementById('btnUser');
btnUser.addEventListener('click', function(event){
    event.preventDefault();
    let user = document.getElementById('user').value;
    console.log('message '+ user);
    database1.push({msg});

 
});


