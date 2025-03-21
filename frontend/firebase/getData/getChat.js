import {initializeApp} from 'firebase/app'
import {
    doc, getDoc,
    getFirestore
}from 'firebase/firestore'
import firebaseConfig from '../config'

/**
 * Fetches chat data from Firestore for a given chat ID.
 * 
 * @param {string} chat_id - The unique ID of the chat document in Firestore.
 * @returns {Promise<Object|null>} A Promise resolving with chat data or null if an error occurs.
 */

async function getChat(chat_id){
    initializeApp(firebaseConfig);

    const db = getFirestore();

    const docRef = doc(db,'chats',chat_id);

    return getDoc(docRef).then((snapshot) =>{
        const chat_data = snapshot.data();
        return chat_data;
        
    }).catch((err)=>{
        console.error(err);
        return null;
    })
}

export default getChat;
