// function pour afficher le tchat
export function ajoutMessageTchat(data, user) {
  document.getElementById('container-msg').innerHTML = '';
  data.on('child_added', (snap) => {
    const mydiv = document.createElement('div');
    const enfant1 = document.createElement('h5');
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
