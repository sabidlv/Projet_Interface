// function With a query to select the group of the user
/*
@param:
 firebase: get a reference to the database service
 user: the alias of the user
*/
export function queryGroup(data, user) {
  // prepare the query ordered by the user to filter on groupe
  // const database2 = firebase.database().ref();
  // const query = database2.child('USER').orderByChild('user');
  debugger;
  const query = data.orderByChild('user');
  query.once('value', (snapshot) => {
    snapshot.forEach((snap) => {
      console.log(snap.val().user);
      if (snap.val().user === user) {
        console.log(snap.val().groupe);
        document.getElementById(snap.val().groupe).setAttribute('style', 'visibility: visible;');
        document.getElementById('label-alias-login').setAttribute('style', 'visibility: hidden;');
        document.getElementById('alias-login').setAttribute('style', 'visibility: hidden;');
        document.getElementById('btn-login-alias').setAttribute('style', 'visibility: hidden;');
      }
    });
  });
}
