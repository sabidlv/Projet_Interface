
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



class ObjMessage{
  constructor(user, msg){
    this.user= user;
    this.msg= msg;
  }
}
let user = document.getElementById('alias').value;
console.log(user); 

document.getElementById('game').addEventListener('click',()=>{
  debugger;
 document.getElementById('container-msg').innerHTML="";
  data = database.ref('GAME/');
  data.on('child_added', function(snap){
  let enfant1 = document.createElement('p');  
  let enfant= document.createElement('p');
  console.log('le set'+ snap.val().objmsg.user);
  let alias = document.createTextNode(snap.val().objmsg.user);
  let text = document.createTextNode(snap.val().objmsg.msg);
  enfant1.appendChild(alias);
  enfant.appendChild(text);
  document.getElementById('container-msg').appendChild(enfant1);  
  document.getElementById('container-msg').appendChild(enfant);
  });
});

document.getElementById('web').addEventListener('click',()=>{
  document.getElementById('container-msg').innerHTML="";
   data = database.ref('WEB/');
   data.on('child_added', function(snap){
    let enfant1 = document.createElement('p');  
    let enfant= document.createElement('p');
    console.log('le set'+ snap.val().objmsg.user);
    let alias = document.createTextNode(snap.val().objmsg.user);
    let text = document.createTextNode(snap.val().objmsg.msg);
    enfant1.appendChild(alias);
    enfant.appendChild(text);
    document.getElementById('container-msg').appendChild(enfant1);  
    document.getElementById('container-msg').appendChild(enfant);
  });
});

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
/*user:
let database1 = firebase.database().ref('USER/');
let btnUser = document.getElementById('btnUser');
btnUser.addEventListener('click', function(event){
    event.preventDefault();
    let user = document.getElementById('user').value;
    console.log('message '+ user);
    database1.push({msg});

 
});*/   

