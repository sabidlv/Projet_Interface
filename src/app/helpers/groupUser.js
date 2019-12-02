// function With a query to select the group of the user
/*
@param:
 firebase: get a reference to the database service
 user: the alias of the user
*/
export function queryGroup(firebase, user) {
  // prepare the query ordered by the user to filter on groupe
  const database2 = firebase.database().ref();
  const query = database2.child('USER').orderByChild('user');
  query.once('value', (snapshot) => {
    snapshot.forEach((snap) => {
      if (snap.val().user === user) {
        console.log(snap.val().groupe);
        document.getElementById(snap.val().groupe).setAttribute('style', 'visibility: visible;');
        document.getElementById('label-alias').setAttribute('style', 'visibility: hidden;');
        document.getElementById('alias-login').setAttribute('style', 'visibility: hidden;');
        document.getElementById('label-groupe').setAttribute('style', 'visibility: hidden;');
        document.getElementById('alias-groupe').setAttribute('style', 'visibility: hidden;');
      }
    });
  });
}
