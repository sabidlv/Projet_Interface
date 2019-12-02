// fonction pour pusher dans la table coorespondante
import ObjMessage from '../classes/message';

/*
*@para: data : path of the table
        user : the current user
*@return: nothing
*/
export function pushMessage(data, user) {
  const msg = document.getElementById('msg').value;
  const objmsg = new ObjMessage(user, msg);
  data.push({ objmsg });
  document.getElementById('msg').value = '';
  document.getElementById('msg').focus();
}
