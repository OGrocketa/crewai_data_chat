import { getApp, initializeApp } from "firebase/app";
import firebaseConfig from "../config";
import {doc, getFirestore,getDoc } from "firebase/firestore";

/**
 * Fetches user chat data from Firestore given a list of chat IDs.
 * 
 * @param {Array} user_chats_ids - An array of chat document IDs that belong to the user.
 * @returns {Array} chatsData - An array containing chat data objects from Firestore.
 */

async function getUserChats(user_chats_ids) {
    initializeApp(firebaseConfig);
    const db = getFirestore();
    let chatsData = [];
    for(const chat_id of user_chats_ids){
        // Get a reference to the chat document in Firestore
        const chatRef = doc(db,'chats', chat_id);
        const chatSnap = await getDoc(chatRef);
        chatsData.push({id:chatSnap.id, ...chatSnap.data()});
    }
    return chatsData;
}

export default getUserChats;