import {initializeApp} from 'firebase/app'
import {
    doc, getDoc,
    getFirestore
}from 'firebase/firestore'
import firebaseConfig from '../config'

async function getChat(chat_id){
    initializeApp(firebaseConfig);

    const db = getFirestore();

    const docRef = doc(db,'chats',chat_id);

    return getDoc(docRef).then((snapshot) =>{
        const chat_data = snapshot.data();
        return chat_data.chat;
    }).catch((err)=>{
        console.error(err);
        return null;
    })
}

export default getChat;
