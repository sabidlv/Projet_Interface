// connection to the right table
import * as firebase from 'firebase/app';
/*
* @param: name of the table
* @return: connection to the table
*/
export function pathTable(table) {
  // connection à la db et la table
  const database = firebase.database();
  const data = database.ref(table);
  return data;
}
