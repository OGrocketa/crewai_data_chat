import { getApp, initializeApp } from "firebase/app";
import firebaseConfig from "../config";
import {doc, getFirestore,getDoc } from "firebase/firestore";

async function getUserChats(user_chats_ids) {
    initializeApp(firebaseConfig);
    const db = getFirestore();
    let chatsData = [];
    for(const chat_id of user_chats_ids){
        const chatRef = doc(db,'chats', chat_id);
        const chatSnap = await getDoc(chatRef);
        chatsData.push({id:chatSnap.id, ...chatSnap.data()});
    }
    return chatsData;
}

export default getUserChats;