import { initializeApp } from "firebase/app";
import firebaseConfig from "../config";
import { getFirestore, addDoc, doc, updateDoc, arrayUnion,collection } from "firebase/firestore";

async function createChat(user_id){
    initializeApp(firebaseConfig);

    const db = getFirestore();

    const chatData = await addDoc(collection(db, "chats"), {
        chat: [],
        filesUploaded: false,
    });
    

    const chat_id = chatData.id;

    const userRef = doc(db, "users", user_id);
    await updateDoc(userRef, {
        user_chats: arrayUnion(chat_id)
    });
    return chat_id;
}

export default createChat;