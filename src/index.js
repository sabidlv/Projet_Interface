  import * as firebase from 'firebase/app';
  import 'firebase/database';  
  var config = {
    apiKey: "AIzaSyCImrYHsVo251bni1yRSMUjqWeoS9MXcms",
    authDomain: "interface-581ae.firebaseapp.com",
    databaseURL: "https://interface-581ae.firebaseio.com",
    storageBucket: "interface-581ae.appspot.com"
  };
firebase.initializeApp(config);
var database = firebase.database();
let data = "";
let user='';
class ObjMessage{
  constructor(user, msg){
    this.user= user;
    this.msg= msg;
  }
}
// se faire un alias
document.getElementById('btn-alias').addEventListener('click',()=>{
  user = document.getElementById('alias').value;
  console.log(user);
  document.getElementById('alias').value='';

});

document.getElementById('game').addEventListener('click',()=>{
  data = database.ref('GAME/');
  ajoutMessageTchat(data, user);
});

document.getElementById('web').addEventListener('click',()=>{
  data = database.ref('WEB/');
  ajoutMessageTchat(data, user);

});

// function
function ajoutMessageTchat(data, user){
  document.getElementById('container-msg').innerHTML="";
  data.on('child_added', function(snap){
   let enfant1 = document.createElement('p');  
   let enfant= document.createElement('p');
   enfant.classList.add('red');
   enfant.classList.add('darken-3');
   let alias = document.createTextNode(snap.val().objmsg.user);
   let text = document.createTextNode(snap.val().objmsg.msg);
   enfant1.appendChild(alias);
   enfant.appendChild(text);
   document.getElementById('container-msg').appendChild(enfant1);  
   document.getElementById('container-msg').appendChild(enfant);
  });
}; 
//pusher un post
let mybtn = document.getElementById('btn-envoie');
mybtn.addEventListener('click', function(event){
    event.preventDefault();
    let msg = document.getElementById('msg').value;
    const objmsg = new ObjMessage(user,msg);
    console.log('message '+ objmsg);
    data.push({objmsg});
    document.getElementById('msg').value='';
    document.getElementById('msg').focus();
 
});
 


