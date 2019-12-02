// import calcul function
// import { calculTaille } from './calculTaille';

// function pour récupérer et afficher les messages et rafraichie automatiquement
/*
*@param: path of the table of db
*@return: nothing
*/
export function getMessage(data) {
  document.getElementById('container-msg').innerHTML = '';
  // retrieve the message from the table to display it
  data.on('child_added', (snap) => {
    const mydiv = document.createElement('div');
    mydiv.setAttribute('id', 'mydiv');
    const enfant1 = document.createElement('span');
    const enfant = document.createElement('p');
    // enfant.classList.add('red');
    // enfant.classList.add('darken-3');
    const alias = document.createTextNode(snap.val().objmsg.user);

    console.log(snap.val().objmsg.user);
    const text = document.createTextNode(`${snap.val().objmsg.msg} :`);
    enfant.appendChild(text);
    enfant1.appendChild(alias);
    document.getElementById('container-msg').appendChild(mydiv);
    mydiv.appendChild(enfant);
    enfant.appendChild(enfant1);
    // calculTaille();
  });
}
