  import * as firebase from 'firebase/app';
  import 'firebase/database';  
  var config = {
    apiKey: "AIzaSyCImrYHsVo251bni1yRSMUjqWeoS9MXcms",
    authDomain: "interface-581ae.firebaseapp.com",
    databaseURL: "https://interface-581ae.firebaseio.com",
    storageBucket: "interface-581ae.appspot.com"
  };
firebase.initializeApp(config);
const database = firebase.database();
const database1 = firebase.database().ref('USER/');
const database2 = firebase.database().ref();
const query = database2.child('USER').orderByChild("user").equalTo('cc');


let data = "";
let user= " ";

query.on('child_added',function(snap){
  let data =snap.val();
    console.log(data);
  });



class ObjMessage{
  constructor(user, msg){
    this.user= user;
    this.msg= msg;
  }
}
class ObjUser{
  constructor(user, groupe){
    this.user = user;
    this.groupe= groupe;
  }
}
// se loguer avec son alias
document.getElementById('btn-login-alias').addEventListener('click', ()=>{
  user = document.getElementById('alias').value;

});

  
// se faire un alias, creation
document.getElementById('btn-save-alias').addEventListener('click',()=>{
  user = document.getElementById('alias').value;
  let groupe = "WAD";
  const objUtilisateur = new ObjUser(user, groupe);
  database1.push(objUtilisateur);
  document.getElementById('alias').value='';
});



// tchat
document.getElementById('game').addEventListener('click',()=>{
  data = database.ref('GAME/');
  ajoutMessageTchat(data, user);
});
document.getElementById('web').addEventListener('click',()=>{
  data = database.ref('WEB/');
  ajoutMessageTchat(data, user);
});
document.getElementById('general').addEventListener('click',()=>{
  data = database.ref('GENERAL/');
  ajoutMessageTchat(data, user);
});
document.getElementById('wad').addEventListener('click',()=>{
  data = database.ref('WAD/');
  ajoutMessageTchat(data, user);
});

// function pour afficher le tchat
function ajoutMessageTchat(data, user){
  document.getElementById('container-msg').innerHTML="";
  data.on('child_added', function(snap){
  let mydiv = document.createElement('div');
  let enfant1 = document.createElement('p');  
  let enfant= document.createElement('p');
   //enfant.classList.add('red');
   //enfant.classList.add('darken-3');
   let alias = document.createTextNode(snap.val().objmsg.user);
   console.log(snap.val());
   let text = document.createTextNode(snap.val().objmsg.msg);
   enfant1.appendChild(alias);
   enfant.appendChild(text);
   document.getElementById('container-msg').appendChild(mydiv);
   mydiv.appendChild(enfant1);  
   mydiv.appendChild(enfant);
  });
}; 
//pusher un post
let mybtn = document.getElementById('btn-envoie');
mybtn.addEventListener('click', function(event){
    event.preventDefault();
    let msg = document.getElementById('msg').value;
    const objmsg = new ObjMessage(user,msg);
    data.push({objmsg});
    document.getElementById('msg').value='';
    document.getElementById('msg').focus();
 
});
 


