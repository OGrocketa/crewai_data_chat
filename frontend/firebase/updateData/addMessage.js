import {initializeApp} from 'firebase/app'
import firebaseConfig from '../config';
import {
    arrayUnion,
    doc,getFirestore,updateDoc
} from 'firebase/firestore'

async function addMessage(chat_id, newMessage){
    initializeApp(firebaseConfig); 
    const db = getFirestore();

    const chatRef = doc(db,'chats',chat_id);

    updateDoc(chatRef,{
        chat: arrayUnion(newMessage)
    });

}

export default addMessage
