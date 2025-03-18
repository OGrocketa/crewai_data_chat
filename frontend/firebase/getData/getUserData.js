import {initializeApp} from 'firebase/app'
import firebaseConfig from '../config';
import{
    getFirestore, doc, getDoc,
}from 'firebase/firestore'

function getUserData(user_id){
    initializeApp(firebaseConfig);

    const db = getFirestore();

    const docRef = doc(db, 'users', user_id);

    return getDoc(docRef).then((snapshot)=>{
        const user_data = {...snapshot.data(),id:snapshot.id }
        return user_data;
    }).catch((err)=>{
        return null;
    })
}

export default getUserData;