import {initializeApp} from 'firebase/app'
import firebaseConfig from '../config';
import {
    arrayUnion,
    doc,getFirestore,updateDoc
} from 'firebase/firestore'

async function dbFilesUploadedFlag(chat_id){
    initializeApp(firebaseConfig);
    const db = getFirestore();

    const chatDocRef = doc(db, 'chats', chat_id);
    updateDoc(chatDocRef,{filesUploaded : true},{merge:true});
    
}

export default dbFilesUploadedFlag;