// fonction pour pusher dans la table coorespondante
import ObjUser from '../classes/user';

/*
*@para: data : path of the table
        user : the current user
*@return: nothing
*/
export function pushUser(data, createUser) {
  // const createUser = document.getElementById('alias').value;
  const groupe = document.getElementById('alias-groupe').value;
  const objUtilisateur = new ObjUser(createUser, groupe);
  data.push(objUtilisateur); // pusher dans la bonne table
  document.getElementById('alias').value = ''; // clear the inputs
  document.getElementById('alias-groupe').value = '';
  return createUser;
}
