  import * as firebase from 'firebase/app';
  import 'firebase/database';  
  import { ajoutMessageTchat} from './app/helpers';

  var config = {
    apiKey: "AIzaSyCImrYHsVo251bni1yRSMUjqWeoS9MXcms",
    authDomain: "interface-581ae.firebaseapp.com",
    databaseURL: "https://interface-581ae.firebaseio.com",
    storageBucket: "interface-581ae.appspot.com"
  };
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
let data = "";
let user= " ";

firebase.initializeApp(config);
const database = firebase.database();
const database1 = firebase.database().ref('USER/');
const database2 = firebase.database().ref();
const query = database2.child('USER').orderByChild("user");//.equalTo('value');

// se loguer avec son alias
document.getElementById('btn-login-alias').addEventListener('click', ()=>{
  user = document.getElementById('alias').value;
  query.once('value',function(snapshot){
    console.log(snapshot.val())
    snapshot.forEach(snap => {
      if(snap.val().user === user){
        console.log(snap.val().groupe);
        document.getElementById(snap.val().groupe).setAttribute('style', 'visibility: visible;');
        document.getElementById('label-alias').setAttribute('style','visibility: hidden;');
        document.getElementById('alias').setAttribute('style','visibility: hidden;');
      }
    });
  });
});

// se faire un alias, creation
document.getElementById('btn-save-alias').addEventListener('click',()=>{
  user = document.getElementById('alias').value;
  let groupe = document.getElementById('alias-groupe').value;
  const objUtilisateur = new ObjUser(user, groupe);
  database1.push(objUtilisateur);
  document.getElementById('alias').value='';
  document.getElementById('alias-groupe').value='';
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
 


