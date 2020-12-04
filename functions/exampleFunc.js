const admin = require('firebase-admin');
const serviceAccount = require('./creds.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const AddItem = async (ingr, usr) => {
  try{
    const pantry = db.collection('pantry').doc(usr);
    const doc = await pantry.get();
    if(!doc.exists){
      data = {
        ingredient: []
      }
      doc = await db.collection('pantry').doc(usr).set(data);
    }
    try{
      ingrs = doc.data().ingredient
      ingrs.push(ingr)
      data = {
        ingredient: ingrs
      }
      await db.collection('pantry').doc(usr).set(data);
    } catch (err) {
      console.log(err)
      data = {
        ingredient: [ingr]
      }
      await db.collection('pantry').doc(usr).set(data);
    }
  }
  catch (err) {
    console.log(err)
  }
} 

const DeleteItem = async (ingr, usr) => {
  try{
    pantry =  db.collection('pantry').doc(usr);
    rmv = await pantry.update({
      ingredient: admin.firestore.FieldValue.arrayRemove(ingr)
    });
  }
  catch (err) {
    console.log(err)
  }
}

const GetPantry = async (usr) => {
  try{
    pantry = await db.collection('pantry').doc(usr).get();
    if(pantry.exists){
      return pantry.data().ingredient
    }
  }
  catch (err) {
    console.log(err)
  }
  return []
}

module.exports = {
  AddItem: AddItem,
  DeleteItem: DeleteItem,
  GetPantry: GetPantry
}

