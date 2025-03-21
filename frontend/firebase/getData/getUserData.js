import {initializeApp} from 'firebase/app'
import firebaseConfig from '../config';
import{
    getFirestore, doc, getDoc,
}from 'firebase/firestore'

/**
 * Fetches user data from Firestore given a user ID.
 * 
 * @param {string} user_id - The unique ID of the user document in Firestore.
 * @returns {Promise<Object|null>} A Promise that resolves with user data or null if an error occurs.
 */

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